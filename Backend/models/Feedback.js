const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    text: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    email: { type: String }, // optional
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "feedbacks" }
);

module.exports = mongoose.model("Feedback", feedbackSchema);