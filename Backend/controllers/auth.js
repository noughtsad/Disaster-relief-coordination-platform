import bcrypt from "bcrypt";
import User from "../models/User.js";
import { signJwt, verifyJwt } from "../utils/jwt.js";

const COOKIE_NAME = process.env.COOKIE_NAME || "token";
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 1000 * 60 * 60 * 24 * 7,
};

export async function signup(req, res) {
  const { email, password, name, userType, phone } = req.body;
  if (!email || !password || !name || !phone)
    return res.status(400).json({ message: "Email, password, name, and phone are required" });

  const existing = await User.findOne({ email });
  if (existing)
    return res.status(409).json({ message: "Email already in use" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed, name, userType, phone });
  const token = signJwt({ id: user._id.toString(), email: user.email, name: user.name, userType: user.userType, phone: user.phone });

  res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);
  return res.status(201).json({
    message: "Signup successful",
    user: { id: user._id, email: user.email, name: user.name, userType: user.userType, phone: user.phone },
  });
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  const user = await User.findOne({ email });
  if (!user)
    return res.status(401).json({ message: "User not found invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: "Password incorrect" });

  const token = signJwt({
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    userType: user.userType,
    phone: user.phone
  });
  res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);
  return res.status(201).json({
    message: "Login successful",
    user: { id: user._id, email: user.email, name: user.name, phone: user.phone, userType: user.userType },
  });
}

export async function logout(req, res) {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return res.json({ message: "Logged out" });
}

export async function me(req, res) {
  const { token } = req.cookies;
  if (!token) {
    return res.status(201).json({ message: "No token present" });
  }
  const decoded = verifyJwt(token);
  const user = await User.findById(decoded.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.json({ user });
}

export async function googleAuth(req, res) {
  try {
    const { _id, email, name } = req.user;
    const token = signJwt({
      id: _id.toString(),
      email,
      name,
    });
    res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);
    res.redirect(process.env.FRONTEND_URL || "http://localhost:3000");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Google authentication failed" });
  }
}

export async function updateUserType(req, res) {
  const { userType } = req.body;
  const userId = req.user.id;
  if (!userType) {
    return res.status(400).json({ message: "User type is required" });
  }
  if (!['Survivor', 'Volunteer', 'NGO', 'Local Authority'].includes(userType)) {
    return res.status(400).json({ message: "Invalid user type" });
  }
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.userType = userType;
  await user.save();
  return res.json({ message: "User type updated", user: { id: user._id, email: user.email, name: user.name, userType: user.userType, phone: user.phone } });
}