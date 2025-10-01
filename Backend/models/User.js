const mongoose = require("mongoose");

const { Schema, Types } = mongoose;

const UserSchema = new Schema(
    {
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true },
        name: { type: String },
        projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
        tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
module.exports = User;
