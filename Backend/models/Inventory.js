import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true,
  },
  itemType: {
    type: String,
    required: true,
    enum: ['Shelter', 'Food', 'Water', 'Medical Supplies', 'Clothing', 'Transportation'],
  },
  itemName: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  unit: {
    type: String,
    required: true,
    enum: ['units', 'kg', 'liters', 'boxes', 'pieces', 'vehicles'],
  },
  threshold: {
    type: Number,
    default: 50,
    min: 0,
  },
  description: {
    type: String,
    trim: true,
  },
  isLowStock: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Update isLowStock before saving
inventorySchema.pre('save', function(next) {
  this.isLowStock = this.quantity <= this.threshold;
  next();
});

// Index for efficient queries
inventorySchema.index({ supplier: 1, itemType: 1 });
inventorySchema.index({ isLowStock: 1 });

const Inventory = mongoose.model('Inventory', inventorySchema);

export default Inventory;
