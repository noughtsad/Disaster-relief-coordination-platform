import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  contact: {
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  deliveryTimeEstimate: {
    type: Number, // in hours
    default: 24,
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    count: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Index for geospatial queries
supplierSchema.index({ location: '2dsphere' });

// Method to update rating
supplierSchema.methods.updateRating = function(newRating) {
  this.rating.count += 1;
  this.rating.total += newRating;
  this.rating.average = this.rating.total / this.rating.count;
  return this.save();
};

const Supplier = mongoose.model('Supplier', supplierSchema);

export default Supplier;
