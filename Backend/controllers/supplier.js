import Supplier from '../models/Supplier.js';
import User from '../models/User.js';

// Create supplier profile
export const createSupplier = async (req, res) => {
  try {
    const { name, contact, location, deliveryTimeEstimate } = req.body;
    
    // JWT uses 'id' not '_id'
    const userId = req.user.id;
    
    console.log('Creating supplier profile for user:', userId);
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    // Validate required fields
    if (!name || !contact || !location) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        required: { name: !!name, contact: !!contact, location: !!location }
      });
    }

    if (!contact.phone || !contact.email || !contact.address) {
      return res.status(400).json({ 
        message: 'Missing required contact fields',
        required: { phone: !!contact.phone, email: !!contact.email, address: !!contact.address }
      });
    }

    if (!location.lat || !location.lng || !location.address) {
      return res.status(400).json({ 
        message: 'Missing required location fields',
        required: { lat: !!location.lat, lng: !!location.lng, address: !!location.address }
      });
    }

    // Check if user already has a supplier profile
    const existingSupplier = await Supplier.findOne({ owner: userId });
    if (existingSupplier) {
      return res.status(400).json({ message: 'Supplier profile already exists' });
    }

    const supplier = new Supplier({
      owner: userId,
      name,
      contact,
      location: {
        type: 'Point',
        coordinates: [location.lng, location.lat], // GeoJSON format: [lng, lat]
        address: location.address,
      },
      deliveryTimeEstimate: deliveryTimeEstimate || 24,
    });

    await supplier.save();
    console.log('Supplier profile created successfully:', supplier._id);

    res.status(201).json({
      message: 'Supplier profile created successfully',
      supplier,
    });
  } catch (error) {
    console.error('Error creating supplier:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ message: 'Error creating supplier profile', error: error.message });
  }
};

// Get supplier profile
export const getSupplierProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const supplier = await Supplier.findOne({ owner: userId }).populate('owner', 'name email');

    if (!supplier) {
      return res.status(404).json({ message: 'Supplier profile not found' });
    }

    res.status(200).json({ supplier });
  } catch (error) {
    console.error('Error fetching supplier profile:', error);
    res.status(500).json({ message: 'Error fetching supplier profile', error: error.message });
  }
};

// Update supplier profile
export const updateSupplier = async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;

    // Handle location update if provided
    if (updates.location) {
      updates.location = {
        type: 'Point',
        coordinates: [updates.location.lng, updates.location.lat],
        address: updates.location.address,
      };
    }

    const supplier = await Supplier.findOneAndUpdate(
      { owner: userId },
      updates,
      { new: true, runValidators: true }
    );

    if (!supplier) {
      return res.status(404).json({ message: 'Supplier profile not found' });
    }

    res.status(200).json({
      message: 'Supplier profile updated successfully',
      supplier,
    });
  } catch (error) {
    console.error('Error updating supplier:', error);
    res.status(500).json({ message: 'Error updating supplier profile', error: error.message });
  }
};

// Get suppliers that have a specific item type with stock
export const getSuppliersWithItem = async (req, res) => {
  try {
    const { itemType, ngoLocation } = req.query;

    if (!itemType) {
      return res.status(400).json({ message: 'Item type is required' });
    }

    // Get all suppliers with the specified item type in inventory
    const suppliers = await Supplier.aggregate([
      {
        $lookup: {
          from: 'inventories',
          localField: '_id',
          foreignField: 'supplier',
          as: 'inventory',
        },
      },
      {
        $match: {
          'inventory.itemType': itemType,
          'inventory.quantity': { $gt: 0 },
          isActive: true,
        },
      },
      {
        $project: {
          name: 1,
          contact: 1,
          location: 1,
          deliveryTimeEstimate: 1,
          rating: 1,
          inventory: {
            $filter: {
              input: '$inventory',
              as: 'item',
              cond: { $eq: ['$$item.itemType', itemType] },
            },
          },
        },
      },
    ]);

    // Calculate distance if NGO location is provided
    if (ngoLocation) {
      const ngoLng = parseFloat(ngoLocation.lng);
      const ngoLat = parseFloat(ngoLocation.lat);

      suppliers.forEach(supplier => {
        const [supplierLng, supplierLat] = supplier.location.coordinates;
        const distance = calculateDistance(ngoLat, ngoLng, supplierLat, supplierLng);
        supplier.distance = parseFloat(distance.toFixed(2));
      });

      // Sort by distance
      suppliers.sort((a, b) => a.distance - b.distance);
    }

    res.status(200).json({ suppliers });
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    res.status(500).json({ message: 'Error fetching suppliers', error: error.message });
  }
};

// Haversine formula to calculate distance between two points
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}
