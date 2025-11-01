import Request from "../models/Request.js";

export const getChatMessages = async (req, res) => {
  try {
    const { requestId } = req.params;
    const userId = req.user.id; // Assuming user ID is available from authentication middleware

    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    const isParticipant = 
      request.survivorId.toString() === userId ||
      (request.acceptedBy && request.acceptedBy.toString() === userId) ||
      (request.responders && request.responders.some(r => r.userId.toString() === userId));

    if (!isParticipant) {
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
