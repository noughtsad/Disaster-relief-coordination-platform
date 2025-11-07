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
      enum: ['Pending', 'Ongoing', 'Awaiting Supplier', 'In Transit', 'Delivered', 'Complete', 'Verified', 'Rejected'],
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
    // Assignment info - Primary responder
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
    // Multiple responders (NGOs, Volunteers, Suppliers who want to help)
    responders: [{
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      userName: {
        type: String,
        required: true
      },
      userRole: {
        type: String,
        enum: ['NGO', 'Volunteer', 'Supplier'],
        required: true
      },
      acceptedAt: {
        type: Date,
        default: Date.now
      },
      status: {
        type: String,
        enum: ['Active', 'Completed', 'Withdrawn'],
        default: 'Active'
      }
    }],
    // Chat feature
    chatEnabled: { 
      type: Boolean, 
      default: false 
    },
    chatMessages: [
      {
        sender: {
          type: Schema.Types.ObjectId,
          required: true,
          refPath: 'chatMessages.onModel',
        },
        onModel: {
          type: String,
          required: true,
          enum: ['User', 'Ngo', 'Supplier'],
        },
        messageContent: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    // Completion tracking
    completedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    completedByName: {
      type: String
    },
    completedByRole: {
      type: String,
      enum: ['NGO', 'Volunteer', 'Supplier', 'Survivor', null]
    },
    completedAt: {
      type: Date
    },
    completionNotes: {
      type: String
    },
    // Verification tracking
    verifiedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    verifiedAt: {
      type: Date
    },
    verificationNotes: {
      type: String
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true }, // Ensure virtuals are included when converting to JSON
    toObject: { virtuals: true } // Ensure virtuals are included when converting to object
  }
);

// Virtual to populate fulfillment requests associated with this request
RequestSchema.virtual('fulfillmentRequests', {
  ref: 'FulfillmentRequest',
  localField: '_id',
  foreignField: 'survivorRequest',
  justOne: false // There can be multiple fulfillment requests for one survivor request
});

// Index for geospatial queries (optional, for future map features)
RequestSchema.index({ latitude: 1, longitude: 1 });

const Request = mongoose.models.Request || mongoose.model("Request", RequestSchema);

export default Request;
