import Request from "../models/Request.js";
import FulfillmentRequest from "../models/FulfillmentRequest.js";
import Supplier from "../models/Supplier.js";

export const getChatMessages = async (req, res) => {
  try {
    const { requestId } = req.params;
    const userId = req.user.id;

    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Allow volunteers to view all chats
    if (req.user.userType === 'Volunteer') {
      const messages = await Request.findById(requestId)
        .select("chatMessages")
        .populate({
          path: 'chatMessages.sender',
          model: 'User',
          select: 'name username userType'
        });
      return res.status(200).json(messages.chatMessages);
    }

    // Check if user is a direct participant (survivor, acceptedBy, or responder)
    const isDirectParticipant = 
      request.survivorId.toString() === userId ||
      (request.acceptedBy && request.acceptedBy.toString() === userId) ||
      (request.responders && request.responders.some(r => r.userId.toString() === userId)) ||
      req.user.userType === 'Volunteer';

    let isSupplierParticipant = false;
    if (!isDirectParticipant) {
      const supplier = await Supplier.findOne({ owner: userId });
      if (supplier) {
        const fulfillment = await FulfillmentRequest.findOne({
          survivorRequest: requestId,
          supplier: supplier._id
        });
        isSupplierParticipant = !!fulfillment;
      }
    }

    if (!isDirectParticipant && !isSupplierParticipant) {
      return res.status(403).json({ message: "User not authorized to view this chat" });
    }

    const messages = await Request.findById(requestId)
      .select("chatMessages")
      .populate({
        path: 'chatMessages.sender',
        model: 'User',
        select: 'name username userType'
      });

    res.status(200).json(messages.chatMessages);
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    res.status(500).json({ message: "Server error" });
  }
};
