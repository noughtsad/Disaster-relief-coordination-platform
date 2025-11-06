import express from "express";
import mongoose from "mongoose";
import Feedback from "./models/Feedback.js";
import Request from "./models/Request.js";
import FulfillmentRequest from "./models/FulfillmentRequest.js";
import Supplier from "./models/Supplier.js";
import * as math from "./mathModule.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import requestRoutes from "./routes/request.js";
import chatRoutes from "./routes/chat.js";
import passport from "passport";
import cors from "cors";
import ngoRoutes from "./routes/ngo.js";
import supplierRoutes from "./routes/supplier.js";
import inventoryRoutes from "./routes/inventory.js";
import fulfillmentRoutes from "./routes/fulfillment.js";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
dotenv.config();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174", "https://*.vercel.app", process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
  }
});

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176", process.env.FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.post("/feedback", async (req, res) => {
  try {
    const { name, text, rating, email } = req.body;

    if (!name || !text || !rating) {
      return res
        .status(400)
        .json({ message: "Name, text, and rating are required" });
    }

    const feedback = new Feedback({ name, text, rating, email });
    await feedback.save();

    res.status(201).json({ message: "Feedback saved successfully", feedback });
  } catch (err) {
    res.status(500).json({ message: "Error saving feedback", error: err });
  }
});

app.get("/feedbacks", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching feedbacks" });
  }
});

app.get("/math", (req, res) => {
  const result = {
    add: math.add(10, 5),
    sub: math.sub(10, 5),
    mul: math.mul(10, 5),
    div: math.div(10, 5),
  };
  res.json(result);
});

app.use("/auth", authRoutes);
app.use("/ngo", ngoRoutes);
app.use("/request", requestRoutes);
app.use("/chat", chatRoutes);
app.use("/supplier", supplierRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/fulfillment", fulfillmentRoutes);

app.get("/" , (req,res) =>{
  res.send("Welcome to Disaster Relief Coordination Platform API")
})

app.use((req, res) => {
  res.status(404).send("Route not found");
});

io.on("connection", (socket) => {

  socket.on("joinRoom", async ({ requestId, userId, userRole }) => {
    try {
      const request = await Request.findById(requestId);
      if (!request) {
        socket.emit("error", "Request not found");
        return;
      }

      // Check if user is a direct participant (survivor, acceptedBy, or responder)
      const isDirectParticipant = 
        request.survivorId.toString() === userId ||
        (request.acceptedBy && request.acceptedBy.toString() === userId) ||
        request.responders.some(r => r.userId.toString() === userId) ||
        userRole === 'Volunteer';

      // Check if user is a supplier with a fulfillment request for this survivor request
      let isSupplierParticipant = false;
      if (!isDirectParticipant && userRole === 'Supplier') {
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
        socket.emit("error", "User not authorized for this room");
        return;
      }

      socket.join(requestId);

      const pastMessages = request.chatMessages.slice(-100);
      socket.emit("pastMessages", pastMessages);

    } catch (error) {
      console.error("Error joining room:", error);
      socket.emit("error", "Failed to join room");
    }
  });

  socket.on("sendMessage", async ({ requestId, sender, onModel, messageContent }) => {
    try {
      const request = await Request.findById(requestId);
      if (!request) {
        console.error("Request not found for chat message");
        socket.emit("error", "Request not found for chat message");
        return;
      }

      const newMessage = {
        sender,
        onModel,
        messageContent,
        createdAt: new Date(),
      };

      request.chatMessages.push(newMessage);
      await request.save();

      const savedMessage = request.chatMessages[request.chatMessages.length - 1];

      // Populate the sender field before emitting
      const populatedMessage = await Request.populate(savedMessage, {
        path: 'sender',
        model: 'User',
        select: 'name username userType'
      });
      
      io.to(requestId).emit("newMessage", populatedMessage);
    } catch (error) {
      console.error("Error sending message:", error.message);
      console.error("Error stack:", error.stack);
      socket.emit("error", "Failed to send message");
    }
  });

  socket.on("disconnect", () => {
    return;
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
