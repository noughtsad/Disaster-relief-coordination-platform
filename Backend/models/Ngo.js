import mongoose from "mongoose";

const { Schema } = mongoose;

const NgoSchema = new Schema(
    {
        ngoName: { type: String, required: true },
        ngoLatitude: { type: String, required: true },
        ngoLongitude: { type: String, required: true },
        ngoContact: { type: String, required: true },
        ngoDescription: { type: String },
        userType: { type: String, default: "NGO", enum: ["NGO"] }
    },
    { timestamps: true }
);

const Ngo = mongoose.models.Ngo || mongoose.model("Ngo", NgoSchema);
export default Ngo;
