import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    text: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    email: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "feedbacks" }
);

export default mongoose.model("Feedback", feedbackSchema);
