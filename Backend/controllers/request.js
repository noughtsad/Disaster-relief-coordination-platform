import Request from "../models/Request.js";
import User from "../models/User.js";


export async function createRequest(req, res) {
  try {
    const { type, urgency, description, latitude, longitude, address, contactInfo } = req.body;
    const userId = req.user.id;

    if (!type || !urgency || !description || !latitude || !longitude) {
      return res.status(400).json({ 
        message: "Type, urgency, description, latitude, and longitude are required" 
      });
    }

    const user = await User.findById(userId).select('name phone');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

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
      chatEnabled: true 
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

export async function getAllRequests(req, res) {
  try {
    const { status } = req.query;
    const filter = {};

    if (status) {
      filter.status = status;
    }

    const requests = await Request.find(filter)
      .populate('survivorId', 'name phone email')
      .populate('acceptedBy', 'name userType')
      .populate('responders.userId', 'name userType')
      .populate({
        path: 'fulfillmentRequests',
        populate: [
          { path: 'supplier', select: 'name' },
          { path: 'inventoryItem', select: 'name' }
        ]
      })
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


export async function getMyRequests(req, res) {
  try {
    const userId = req.user.id;
    
    const requests = await Request.find({ survivorId: userId })
      .populate('acceptedBy', 'name userType')
      .populate('responders.userId', 'name userType')
      .populate({
        path: 'fulfillmentRequests',
        populate: [
          { path: 'supplier', select: 'name' },
          { path: 'inventoryItem', select: 'name' }
        ]
      })
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

    const alreadyAccepted = request.responders.some(
      responder => responder.userId.toString() === userId
    );

    if (alreadyAccepted) {
      return res.status(400).json({ message: "You have already accepted this request" });
    }

    request.responders.push({
      userId: userId,
      userName: user.name,
      userRole: user.userType,
      acceptedAt: new Date(),
      status: 'Active'
    });


    if (!request.acceptedBy) {
      request.status = 'Ongoing';
      request.acceptedBy = userId;
      request.acceptedByName = user.name;
      request.acceptedByRole = user.userType;
      request.chatEnabled = true;
    }
    
    await request.save();

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


export async function markRequestComplete(req, res) {
  try {
    const { requestId } = req.params;
    const { completionNotes } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId).select('name userType');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.userType !== 'Survivor') {
      return res.status(403).json({ message: "Only Survivors can mark requests as complete" });
    }

    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.survivorId.toString() !== userId) {
      return res.status(403).json({ message: "You can only mark your own requests as complete" });
    }

    if (request.status !== 'Delivered') {
      return res.status(400).json({ message: "Request must be in 'Delivered' status to be marked as complete" });
    }

    if (request.status === 'Complete' || request.status === 'Verified') {
      return res.status(400).json({ message: "This request has already been marked as complete or verified" });
    }

    request.status = 'Complete';
    request.completedBy = userId;
    request.completedByName = user.name;
    request.completedByRole = user.userType;
    request.completedAt = new Date();
    request.completionNotes = completionNotes || '';

    await request.save();

    return res.json({
      message: "Request marked as complete successfully. Awaiting volunteer verification.",
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

export async function verifyRequestByVolunteer(req, res) {
  try {
    const { requestId } = req.params;
    const { verificationNotes } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId).select('name userType');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.userType !== 'Volunteer') {
      return res.status(403).json({ message: "Only Volunteers can verify request completion" });
    }

    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.status !== 'Complete') {
      return res.status(400).json({ message: "Request must be marked as complete before verification" });
    }

    request.status = 'Verified';
    request.verifiedBy = userId;
    request.verifiedAt = new Date();
    request.verificationNotes = verificationNotes || '';
    request.chatEnabled = false;

    await request.save();


    return res.json({
      message: "Request verified successfully. Chat disabled.",
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


export async function getRequestsByLocation(req, res) {
  try {
    const { latitude, longitude, radius = 10 } = req.query;
    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Latitude and longitude are required" });
    }


    const requests = await Request.find()
      .populate('survivorId', 'name phone email')
      .sort({ createdAt: -1 });


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


export async function withdrawFromRequest(req, res) {
  try {
    const { requestId } = req.params;
    const userId = req.user.id;

    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }


    const responderIndex = request.responders.findIndex(
      responder => responder.userId.toString() === userId
    );

    if (responderIndex === -1) {
      return res.status(400).json({ message: "You haven't accepted this request" });
    }


    request.responders[responderIndex].status = 'Withdrawn';


    if (request.acceptedBy && request.acceptedBy.toString() === userId) {
      const nextActiveResponder = request.responders.find(
        r => r.status === 'Active' && r.userId.toString() !== userId
      );

      if (nextActiveResponder) {
        request.acceptedBy = nextActiveResponder.userId;
        request.acceptedByName = nextActiveResponder.userName;
        request.acceptedByRole = nextActiveResponder.userRole;
      } else {

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


export async function getMyAcceptedRequests(req, res) {
  try {
    const userId = req.user.id;
    
    const requests = await Request.find({
      acceptedBy: userId,
      status: { $in: ['Ongoing', 'Awaiting Supplier', 'In Transit', 'Delivered', 'Complete'] } 
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


export async function getMyNgoRequests(req, res) {
  try {
    const userId = req.user.id;

    const requests = await Request.find({
      $or: [
        { acceptedBy: userId }, 
        { 'responders.userId': userId }, 
        { status: 'Verified' } 
      ]
    })
      .populate('survivorId', 'name phone email')
      .populate('acceptedBy', 'name userType')
      .populate('responders.userId', 'name userType')
      .populate({
        path: 'fulfillmentRequests',
        populate: [
          { path: 'supplier', select: 'name' },
          { path: 'inventoryItem', select: 'name' }
        ]
      })
      .sort({ createdAt: -1 });

    return res.json({ requests, total: requests.length });
  } catch (error) {
    console.error("Get my NGO requests error:", error);
    return res.status(500).json({
      message: "Error fetching all requests for your NGO",
      error: error.message
    });
  }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
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

export async function getRequestsForNgoMap(req, res) {
  try {
    const userId = req.user.id;
    const pendingRequests = await Request.find({ 
      status: 'Pending'
    })
      .populate('survivorId', 'name phone email')
      .select('type urgency description latitude longitude address contactInfo survivorId survivorName survivorPhone status createdAt')
      .sort({ urgency: -1, createdAt: -1 });
    const acceptedRequests = await Request.find({
      $or: [
        { acceptedBy: userId },
        { 'responders.userId': userId }
      ],
      status: { $in: ['Ongoing', 'Complete'] }
    })
      .populate('survivorId', 'name phone email')
      .populate('acceptedBy', 'name userType')
      .populate('responders.userId', 'name userType')
      .sort({ createdAt: -1 });

    return res.json({
      pendingRequests,
      acceptedRequests,
      counts: {
        pending: pendingRequests.length,
        accepted: acceptedRequests.length
      }
    });
  } catch (error) {
    console.error("Get requests for NGO map error:", error);
    return res.status(500).json({ 
      message: "Error fetching requests for map", 
      error: error.message 
    });
  }
}
