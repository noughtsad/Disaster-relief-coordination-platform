import express from "express";
import mongoose from "mongoose";
import Feedback from "./models/Feedback.js";
import * as math from "./mathModule.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

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

app.use((req, res) => {
  res.status(404).send("Route not found");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/`);
});
