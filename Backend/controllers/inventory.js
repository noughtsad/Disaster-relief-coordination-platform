import Inventory from '../models/Inventory.js';
import Supplier from '../models/Supplier.js';

// Add inventory item
export const addInventoryItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemType, itemName, quantity, unit, threshold, description } = req.body;

    // Get supplier profile
    const supplier = await Supplier.findOne({ owner: userId });
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier profile not found. Please create a supplier profile first.' });
    }

    const inventoryItem = new Inventory({
      supplier: supplier._id,
      itemType,
      itemName,
      quantity,
      unit,
      threshold: threshold || 50,
      description,
    });

    await inventoryItem.save();

    res.status(201).json({
      message: 'Inventory item added successfully',
      item: inventoryItem,
    });
  } catch (error) {
    console.error('Error adding inventory item:', error);
    res.status(500).json({ message: 'Error adding inventory item', error: error.message });
  }
};

// Get all inventory items for logged-in supplier
export const getMyInventory = async (req, res) => {
  try {
    const userId = req.user.id;

    const supplier = await Supplier.findOne({ owner: userId });
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier profile not found' });
    }

    const inventory = await Inventory.find({ supplier: supplier._id }).sort({ createdAt: -1 });

    res.status(200).json({ inventory });
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ message: 'Error fetching inventory', error: error.message });
  }
};

// Get low stock items
export const getLowStockItems = async (req, res) => {
  try {
    const userId = req.user.id;

    const supplier = await Supplier.findOne({ owner: userId });
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier profile not found' });
    }

    const lowStockItems = await Inventory.find({
      supplier: supplier._id,
      isLowStock: true,
    }).sort({ quantity: 1 });

    res.status(200).json({ lowStockItems });
  } catch (error) {
    console.error('Error fetching low stock items:', error);
    res.status(500).json({ message: 'Error fetching low stock items', error: error.message });
  }
};

// Update inventory item
export const updateInventoryItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.params;
    const updates = req.body;

    const supplier = await Supplier.findOne({ owner: userId });
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier profile not found' });
    }

    const item = await Inventory.findOneAndUpdate(
      { _id: itemId, supplier: supplier._id },
      updates,
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    res.status(200).json({
      message: 'Inventory item updated successfully',
      item,
    });
  } catch (error) {
    console.error('Error updating inventory item:', error);
    res.status(500).json({ message: 'Error updating inventory item', error: error.message });
  }
};

// Delete inventory item
export const deleteInventoryItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.params;

    const supplier = await Supplier.findOne({ owner: userId });
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier profile not found' });
    }

    const item = await Inventory.findOneAndDelete({
      _id: itemId,
      supplier: supplier._id,
    });

    if (!item) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    res.status(200).json({ message: 'Inventory item deleted successfully' });
  } catch (error) {
    console.error('Error deleting inventory item:', error);
    res.status(500).json({ message: 'Error deleting inventory item', error: error.message });
  }
};

// Decrease inventory quantity (called when fulfillment is dispatched)
export const decreaseInventory = async (inventoryId, quantity) => {
  try {
    const item = await Inventory.findById(inventoryId);
    if (!item) {
      throw new Error('Inventory item not found');
    }

    if (item.quantity < quantity) {
      throw new Error('Insufficient stock');
    }

    item.quantity -= quantity;
    await item.save();

    return item;
  } catch (error) {
    throw error;
  }
};
