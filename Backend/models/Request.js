import mongoose from "mongoose";

const { Schema } = mongoose;

const RequestSchema = new Schema(
  {
    type: { 
      type: String, 
      required: true,
      enum: ['Shelter', 'Food', 'Water', 'Medical Supplies', 'Clothing', 'Transportation', 'Other']
    },
    status: { 
      type: String, 
      required: true,
      enum: ['Pending', 'Approved', 'Completed', 'Rejected'],
      default: 'Pending'
    },
    urgency: { 
      type: String, 
      required: true,
      enum: ['Low', 'Medium', 'High']
    },
    description: { 
      type: String, 
      required: true 
    },
    // Location data
    latitude: { 
      type: String, 
      required: true 
    },
    longitude: { 
      type: String, 
      required: true 
    },
    address: { 
      type: String 
    },
    location: { 
      type: String // For backward compatibility
    },
    // Contact and user info
    contactInfo: { 
      type: String 
    },
    survivorId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User',
      required: true
    },
    survivorName: {
      type: String
    },
    survivorPhone: {
      type: String
    },
    // Assignment info
    acceptedBy: { 
      type: Schema.Types.ObjectId, 
      ref: 'User'
    },
    acceptedByName: {
      type: String
    },
    acceptedByRole: {
      type: String,
      enum: ['NGO', 'Volunteer', 'Supplier', null]
    },
    // Chat feature
    chatEnabled: { 
      type: Boolean, 
      default: false 
    },
  },
  { 
    timestamps: true 
  }
);

// Index for geospatial queries (optional, for future map features)
RequestSchema.index({ latitude: 1, longitude: 1 });

const Request = mongoose.models.Request || mongoose.model("Request", RequestSchema);

export default Request;
