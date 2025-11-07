import FulfillmentRequest from '../models/FulfillmentRequest.js';
import Supplier from '../models/Supplier.js';
import Ngo from '../models/Ngo.js';
import Inventory from '../models/Inventory.js';
import Request from '../models/Request.js';
import { decreaseInventory } from './inventory.js';

// NGO creates fulfillment request to supplier
export const createFulfillmentRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { survivorRequestId, supplierId, inventoryItemId, requestedQuantity, message } = req.body;

    // Get NGO profile
    const ngo = await Ngo.findOne({ owner: userId });
    if (!ngo) {
      return res.status(404).json({ message: 'NGO profile not found' });
    }

    // Verify survivor request exists and NGO is assigned to it
    const survivorRequest = await Request.findById(survivorRequestId);
    if (!survivorRequest) {
      return res.status(404).json({ message: 'Survivor request not found' });
    }

    // Check if the NGO owner (user) is in the responders array
    const isAssigned = survivorRequest.responders.some(
      responder => responder.userId.toString() === userId.toString()
    );
    if (!isAssigned) {
      return res.status(403).json({ message: 'NGO is not assigned to this request' });
    }

    // Verify inventory item exists and belongs to supplier
    const inventoryItem = await Inventory.findOne({
      _id: inventoryItemId,
      supplier: supplierId,
    });
    if (!inventoryItem) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    // Check if there's enough stock
    if (inventoryItem.quantity < requestedQuantity) {
      return res.status(400).json({
        message: 'Requested quantity exceeds available stock',
        availableStock: inventoryItem.quantity,
      });
    }

    const fulfillmentRequest = new FulfillmentRequest({
      survivorRequest: survivorRequestId,
      ngo: ngo._id,
      supplier: supplierId,
      inventoryItem: inventoryItemId,
      requestedQuantity,
      message,
    });

    await fulfillmentRequest.save();

    if (survivorRequest.status === 'Ongoing') {
      survivorRequest.status = 'Awaiting Supplier';
      await survivorRequest.save();
    }

    res.status(201).json({
      message: 'Fulfillment request sent to supplier',
      fulfillmentRequest,
    });
  } catch (error) {
    console.error('Error creating fulfillment request:', error);
    res.status(500).json({ message: 'Error creating fulfillment request', error: error.message });
  }
};

// Supplier accepts fulfillment request
export const acceptFulfillmentRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fulfillmentId } = req.params;
    const { fulfilledQuantity } = req.body;

    const supplier = await Supplier.findOne({ owner: userId });
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier profile not found' });
    }

    const fulfillment = await FulfillmentRequest.findOne({
      _id: fulfillmentId,
      supplier: supplier._id,
    }).populate('inventoryItem');

    if (!fulfillment) {
      return res.status(404).json({ message: 'Fulfillment request not found' });
    }

    if (fulfillment.status !== 'Pending') {
      return res.status(400).json({ message: 'Fulfillment request already processed' });
    }

    // Validate fulfilled quantity
    const quantityToFulfill = fulfilledQuantity || fulfillment.requestedQuantity;
    if (quantityToFulfill > fulfillment.inventoryItem.quantity) {
      return res.status(400).json({
        message: 'Insufficient stock',
        availableStock: fulfillment.inventoryItem.quantity,
      });
    }

    fulfillment.status = 'Accepted';
    fulfillment.fulfilledQuantity = quantityToFulfill;
    await fulfillment.save();

    res.status(200).json({
      message: 'Fulfillment request accepted',
      fulfillment,
    });
  } catch (error) {
    console.error('Error accepting fulfillment request:', error);
    res.status(500).json({ message: 'Error accepting fulfillment request', error: error.message });
  }
};

// Supplier rejects fulfillment request
export const rejectFulfillmentRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fulfillmentId } = req.params;
    const { rejectionReason } = req.body;

    const supplier = await Supplier.findOne({ owner: userId });
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier profile not found' });
    }

    const fulfillment = await FulfillmentRequest.findOne({
      _id: fulfillmentId,
      supplier: supplier._id,
    });

    if (!fulfillment) {
      return res.status(404).json({ message: 'Fulfillment request not found' });
    }

    if (fulfillment.status !== 'Pending') {
      return res.status(400).json({ message: 'Fulfillment request already processed' });
    }

    fulfillment.status = 'Rejected';
    fulfillment.rejectionReason = rejectionReason;
    await fulfillment.save();

    res.status(200).json({
      message: 'Fulfillment request rejected',
      fulfillment,
    });
  } catch (error) {
    console.error('Error rejecting fulfillment request:', error);
    res.status(500).json({ message: 'Error rejecting fulfillment request', error: error.message });
  }
};

// Supplier dispatches order
export const dispatchFulfillment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fulfillmentId } = req.params;
    const { trackingInfo, expectedDeliveryHours } = req.body;

    const supplier = await Supplier.findOne({ owner: userId });
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier profile not found' });
    }

    const fulfillment = await FulfillmentRequest.findOne({
      _id: fulfillmentId,
      supplier: supplier._id,
    }).populate('inventoryItem survivorRequest');

    if (!fulfillment) {
      return res.status(404).json({ message: 'Fulfillment request not found' });
    }

    if (fulfillment.status !== 'Accepted') {
      return res.status(400).json({ message: 'Can only dispatch accepted fulfillment requests' });
    }

    // Decrease inventory
    await decreaseInventory(fulfillment.inventoryItem._id, fulfillment.fulfilledQuantity);

    // Update fulfillment request
    const dispatchedAt = new Date();
    const expectedDelivery = new Date(dispatchedAt.getTime() + (expectedDeliveryHours || supplier.deliveryTimeEstimate) * 60 * 60 * 1000);

    fulfillment.status = 'Dispatched';
    fulfillment.dispatchDetails = {
      dispatchedAt,
      expectedDelivery,
      trackingInfo,
    };
    await fulfillment.save();

    // Update survivor request status to "In Transit"
    const survivorRequest = await Request.findById(fulfillment.survivorRequest);
    if (survivorRequest && survivorRequest.status === 'Awaiting Supplier') {
      survivorRequest.status = 'In Transit';
      await survivorRequest.save();
    }

    res.status(200).json({
      message: 'Order dispatched successfully',
      fulfillment,
    });
  } catch (error) {
    console.error('Error dispatching fulfillment:', error);
    res.status(500).json({ message: 'Error dispatching fulfillment', error: error.message });
  }
};

// Mark fulfillment as delivered
export const markAsDelivered = async (req, res) => {
  try {
    const { fulfillmentId } = req.params;
    const { receivedBy, notes } = req.body;

    const fulfillment = await FulfillmentRequest.findById(fulfillmentId).populate('survivorRequest');

    if (!fulfillment) {
      return res.status(404).json({ message: 'Fulfillment request not found' });
    }

    if (fulfillment.status !== 'Dispatched') {
      return res.status(400).json({ message: 'Can only mark dispatched orders as delivered' });
    }

    fulfillment.status = 'Delivered';
    fulfillment.deliveryDetails = {
      deliveredAt: new Date(),
      receivedBy,
      notes,
    };
    await fulfillment.save();

    // Check if all fulfillments for this survivor request are delivered
    const allFulfillments = await FulfillmentRequest.find({
      survivorRequest: fulfillment.survivorRequest._id,
    });

    const allDelivered = allFulfillments.every(f => f.status === 'Delivered');

    if (allDelivered) {
      const survivorRequest = await Request.findById(fulfillment.survivorRequest);
      if (survivorRequest) {
        survivorRequest.status = 'Delivered';
        await survivorRequest.save();
      }
    }

    res.status(200).json({
      message: 'Fulfillment marked as delivered',
      fulfillment,
    });
  } catch (error) {
    console.error('Error marking as delivered:', error);
    res.status(500).json({ message: 'Error marking as delivered', error: error.message });
  }
};

// Get fulfillment requests for supplier
export const getMyFulfillments = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status } = req.query;

    const supplier = await Supplier.findOne({ owner: userId });
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier profile not found' });
    }

    const filter = { supplier: supplier._id };
    if (status) {
      filter.status = status;
    }

    const fulfillments = await FulfillmentRequest.find(filter)
      .populate('ngo', 'ngoName ngoContact ngoLatitude ngoLongitude')
      .populate('inventoryItem')
      .populate({
        path: 'survivorRequest',
        populate: { path: 'survivorId', select: 'name phone email' },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ fulfillments });
  } catch (error) {
    console.error('Error fetching fulfillments:', error);
    res.status(500).json({ message: 'Error fetching fulfillments', error: error.message });
  }
};

// Get fulfillments for NGO's request
export const getFulfillmentsForRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { requestId } = req.params;

    const ngo = await Ngo.findOne({ owner: userId });
    if (!ngo) {
      return res.status(404).json({ message: 'NGO profile not found' });
    }

    const fulfillments = await FulfillmentRequest.find({
      survivorRequest: requestId,
      ngo: ngo._id,
    })
      .populate('supplier', 'name contact location rating deliveryTimeEstimate')
      .populate('inventoryItem')
      .sort({ createdAt: -1 });

    res.status(200).json({ fulfillments });
  } catch (error) {
    console.error('Error fetching fulfillments:', error);
    res.status(500).json({ message: 'Error fetching fulfillments', error: error.message });
  }
};

// Rate supplier after delivery
export const rateSupplier = async (req, res) => {
  try {
    const { fulfillmentId } = req.params;
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const fulfillment = await FulfillmentRequest.findById(fulfillmentId).populate('supplier');

    if (!fulfillment) {
      return res.status(404).json({ message: 'Fulfillment request not found' });
    }

    if (fulfillment.status !== 'Delivered') {
      return res.status(400).json({ message: 'Can only rate delivered orders' });
    }

    if (fulfillment.rating) {
      return res.status(400).json({ message: 'Fulfillment already rated' });
    }

    fulfillment.rating = rating;
    fulfillment.ratingComment = comment;
    await fulfillment.save();

    // Update supplier's rating
    await fulfillment.supplier.updateRating(rating);

    res.status(200).json({
      message: 'Rating submitted successfully',
      fulfillment,
    });
  } catch (error) {
    console.error('Error rating supplier:', error);
    res.status(500).json({ message: 'Error rating supplier', error: error.message });
  }
};
