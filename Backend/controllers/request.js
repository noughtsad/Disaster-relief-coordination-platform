import Request from "../models/Request.js";
import User from "../models/User.js";

// Create a new request
export async function createRequest(req, res) {
  try {
    const { type, urgency, description, latitude, longitude, address, contactInfo } = req.body;
    const userId = req.user.id;

    // Validate required fields
    if (!type || !urgency || !description || !latitude || !longitude) {
      return res.status(400).json({ 
        message: "Type, urgency, description, latitude, and longitude are required" 
      });
    }

    // Get user details
    const user = await User.findById(userId).select('name phone');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create request
    const request = await Request.create({
      type,
      urgency,
      description,
      latitude,
      longitude,
      address,
      location: `${latitude}, ${longitude}`,
      contactInfo,
      survivorId: userId,
      survivorName: user.name,
      survivorPhone: user.phone || contactInfo,
      status: 'Pending',
      chatEnabled: false
    });

    return res.status(201).json({
      message: "Request created successfully",
      request
    });
  } catch (error) {
    console.error("Create request error:", error);
    return res.status(500).json({ 
      message: "Error creating request", 
      error: error.message 
    });
  }
}

// Get all requests (for NGOs/Volunteers)
export async function getAllRequests(req, res) {
  try {
    const requests = await Request.find()
      .populate('survivorId', 'name phone email')
      .populate('acceptedBy', 'name userType')
      .populate('responders.userId', 'name userType')
      .sort({ createdAt: -1 });

    return res.json({ requests });
  } catch (error) {
    console.error("Get requests error:", error);
    return res.status(500).json({ 
      message: "Error fetching requests", 
      error: error.message 
    });
  }
}

// Get user's own requests (for Survivors)
export async function getMyRequests(req, res) {
  try {
    const userId = req.user.id;
    
    const requests = await Request.find({ survivorId: userId })
      .populate('acceptedBy', 'name userType')
      .populate('responders.userId', 'name userType')
      .sort({ createdAt: -1 });

    return res.json({ requests });
  } catch (error) {
    console.error("Get my requests error:", error);
    return res.status(500).json({ 
      message: "Error fetching your requests", 
      error: error.message 
    });
  }
}

// Accept a request (for NGOs/Volunteers/Suppliers)
export async function acceptRequest(req, res) {
  try {
    const { requestId } = req.params;
    const userId = req.user.id;

    const user = await User.findById(userId).select('name userType');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!['NGO', 'Volunteer', 'Supplier'].includes(user.userType)) {
      return res.status(403).json({ message: "Only NGOs, Volunteers, and Suppliers can accept requests" });
    }

    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Check if user already accepted this request
    const alreadyAccepted = request.responders.some(
      responder => responder.userId.toString() === userId
    );

    if (alreadyAccepted) {
      return res.status(400).json({ message: "You have already accepted this request" });
    }

    // Add responder to the list
    request.responders.push({
      userId: userId,
      userName: user.name,
      userRole: user.userType,
      acceptedAt: new Date(),
      status: 'Active'
    });

    console.log('Added responder:', { userId, userName: user.name, userRole: user.userType });
    console.log('Total responders before save:', request.responders.length);

    // If this is the first responder, set as primary acceptedBy and change status to Ongoing
    if (!request.acceptedBy) {
      request.status = 'Ongoing';
      request.acceptedBy = userId;
      request.acceptedByName = user.name;
      request.acceptedByRole = user.userType;
      request.chatEnabled = true;
    }
    
    await request.save();
    
    console.log('Total responders after save:', request.responders.length);
    console.log('Responders array:', JSON.stringify(request.responders, null, 2));

    return res.json({
      message: "Request accepted successfully",
      request,
      totalResponders: request.responders.length
    });
  } catch (error) {
    console.error("Accept request error:", error);
    return res.status(500).json({ 
      message: "Error accepting request", 
      error: error.message 
    });
  }
}

// Mark request as complete (by NGO/Volunteer/Supplier)
export async function markRequestComplete(req, res) {
  try {
    const { requestId } = req.params;
    const { completionNotes } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId).select('name userType');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Only NGOs, Volunteers, and Suppliers can mark as complete
    if (!['NGO', 'Volunteer', 'Supplier'].includes(user.userType)) {
      return res.status(403).json({ message: "Only NGOs, Volunteers, and Suppliers can mark requests as complete" });
    }

    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Check if user is a responder on this request
    const isResponder = request.responders.some(
      responder => responder.userId.toString() === userId && responder.status === 'Active'
    );

    if (!isResponder) {
      return res.status(403).json({ message: "You must be an active responder to mark this request as complete" });
    }

    // Check if already completed or verified
    if (request.status === 'Complete' || request.status === 'Verified') {
      return res.status(400).json({ message: "This request has already been marked as complete" });
    }

    // Update request to Complete status
    request.status = 'Complete';
    request.completedBy = userId;
    request.completedByName = user.name;
    request.completedByRole = user.userType;
    request.completedAt = new Date();
    request.completionNotes = completionNotes || '';

    await request.save();

    console.log(`Request ${requestId} marked as complete by ${user.name} (${user.userType})`);

    return res.json({
      message: "Request marked as complete successfully. Awaiting survivor verification.",
      request
    });
  } catch (error) {
    console.error("Mark complete error:", error);
    return res.status(500).json({ 
      message: "Error marking request as complete", 
      error: error.message 
    });
  }
}

// Verify request completion (by Survivor only)
export async function verifyRequestCompletion(req, res) {
  try {
    const { requestId } = req.params;
    const { verificationNotes } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId).select('name userType');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Only Survivors can verify
    if (user.userType !== 'Survivor') {
      return res.status(403).json({ message: "Only survivors can verify request completion" });
    }

    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Check if this is their request
    if (request.survivorId.toString() !== userId) {
      return res.status(403).json({ message: "You can only verify your own requests" });
    }

    // Check if request is in Complete status
    if (request.status !== 'Complete') {
      return res.status(400).json({ message: "Request must be marked as complete before verification" });
    }

    // Update request to Verified status
    request.status = 'Verified';
    request.verifiedBy = userId;
    request.verifiedAt = new Date();
    request.verificationNotes = verificationNotes || '';

    await request.save();

    console.log(`Request ${requestId} verified by survivor ${user.name}`);

    return res.json({
      message: "Request verified successfully. Thank you for confirming!",
      request
    });
  } catch (error) {
    console.error("Verify request error:", error);
    return res.status(500).json({ 
      message: "Error verifying request", 
      error: error.message 
    });
  }
}

// Update request status (generic - for admin use)
export async function updateRequestStatus(req, res) {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    if (!['Pending', 'Ongoing', 'Complete', 'Verified', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const request = await Request.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    return res.json({
      message: "Request status updated successfully",
      request
    });
  } catch (error) {
    console.error("Update request status error:", error);
    return res.status(500).json({ 
      message: "Error updating request status", 
      error: error.message 
    });
  }
}

// Get requests by location (within radius)
export async function getRequestsByLocation(req, res) {
  try {
    const { latitude, longitude, radius = 10 } = req.query; // radius in km

    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Latitude and longitude are required" });
    }

    // Simple distance calculation (for more accurate, use MongoDB geospatial queries)
    const requests = await Request.find()
      .populate('survivorId', 'name phone email')
      .sort({ createdAt: -1 });

    // Filter by distance (basic calculation)
    const filteredRequests = requests.filter(request => {
      const distance = calculateDistance(
        parseFloat(latitude),
        parseFloat(longitude),
        parseFloat(request.latitude),
        parseFloat(request.longitude)
      );
      return distance <= radius;
    });

    return res.json({ requests: filteredRequests });
  } catch (error) {
    console.error("Get requests by location error:", error);
    return res.status(500).json({ 
      message: "Error fetching requests by location", 
      error: error.message 
    });
  }
}

// Get responders for a specific request
export async function getRequestResponders(req, res) {
  try {
    const { requestId } = req.params;

    const request = await Request.findById(requestId)
      .populate('responders.userId', 'name email phone userType');

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    return res.json({
      responders: request.responders,
      totalResponders: request.responders.length
    });
  } catch (error) {
    console.error("Get responders error:", error);
    return res.status(500).json({ 
      message: "Error fetching responders", 
      error: error.message 
    });
  }
}

// Withdraw from a request
export async function withdrawFromRequest(req, res) {
  try {
    const { requestId } = req.params;
    const userId = req.user.id;

    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Find responder
    const responderIndex = request.responders.findIndex(
      responder => responder.userId.toString() === userId
    );

    if (responderIndex === -1) {
      return res.status(400).json({ message: "You haven't accepted this request" });
    }

    // Update responder status to withdrawn
    request.responders[responderIndex].status = 'Withdrawn';

    // If this was the primary acceptedBy, reassign to next active responder
    if (request.acceptedBy && request.acceptedBy.toString() === userId) {
      const nextActiveResponder = request.responders.find(
        r => r.status === 'Active' && r.userId.toString() !== userId
      );

      if (nextActiveResponder) {
        request.acceptedBy = nextActiveResponder.userId;
        request.acceptedByName = nextActiveResponder.userName;
        request.acceptedByRole = nextActiveResponder.userRole;
      } else {
        // No other active responders, set back to pending
        request.status = 'Pending';
        request.acceptedBy = null;
        request.acceptedByName = null;
        request.acceptedByRole = null;
        request.chatEnabled = false;
      }
    }

    await request.save();

    return res.json({
      message: "Successfully withdrawn from request",
      request
    });
  } catch (error) {
    console.error("Withdraw from request error:", error);
    return res.status(500).json({ 
      message: "Error withdrawing from request", 
      error: error.message 
    });
  }
}

// Get my accepted requests (for NGOs/Volunteers/Suppliers)
export async function getMyAcceptedRequests(req, res) {
  try {
    const userId = req.user.id;
    
    const requests = await Request.find({
      'responders.userId': userId,
      'responders.status': 'Active'
    })
      .populate('survivorId', 'name phone email')
      .populate('responders.userId', 'name userType')
      .sort({ createdAt: -1 });

    return res.json({ requests, total: requests.length });
  } catch (error) {
    console.error("Get my accepted requests error:", error);
    return res.status(500).json({ 
      message: "Error fetching your accepted requests", 
      error: error.message 
    });
  }
}

// Helper function to calculate distance between two coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}
