import mongoose from 'mongoose';

const fulfillmentRequestSchema = new mongoose.Schema({
  survivorRequest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Request',
    required: true,
  },
  ngo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ngo',
    required: true,
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true,
  },
  inventoryItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inventory',
    required: true,
  },
  requestedQuantity: {
    type: Number,
    required: true,
    min: 1,
  },
  fulfilledQuantity: {
    type: Number,
    default: 0,
    min: 0,
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected', 'Dispatched', 'Delivered'],
    default: 'Pending',
  },
  message: {
    type: String,
    trim: true,
  },
  rejectionReason: {
    type: String,
    trim: true,
  },
  dispatchDetails: {
    dispatchedAt: Date,
    expectedDelivery: Date,
    trackingInfo: String,
  },
  deliveryDetails: {
    deliveredAt: Date,
    receivedBy: String,
    notes: String,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  ratingComment: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

// Indexes for efficient queries
fulfillmentRequestSchema.index({ supplier: 1, status: 1 });
fulfillmentRequestSchema.index({ ngo: 1, survivorRequest: 1 });
fulfillmentRequestSchema.index({ survivorRequest: 1 });

const FulfillmentRequest = mongoose.model('FulfillmentRequest', fulfillmentRequestSchema);

export default FulfillmentRequest;
