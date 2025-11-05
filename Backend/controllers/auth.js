import bcrypt from "bcrypt";
import User from "../models/User.js";
import { signJwt, verifyJwt } from "../utils/jwt.js";
import dotenv from "dotenv";
dotenv.config();

const COOKIE_NAME = process.env.COOKIE_NAME || "token";
const COOKIE_OPTIONS = {
    httpOnly: true,
      secure: true, // For local testing change to false
  sameSite: "none", // For local testing change to lax
  maxAge: 1000 * 60 * 60 * 24 * 7,
};

export async function signup(req, res) {
  const { email, password, name, userType, phone } = req.body;
  if (!email || !password || !name || !phone)
    return res
      .status(400)
      .json({ message: "Email, password, name, and phone are required" });

  const existing = await User.findOne({ email });
  if (existing)
    return res.status(409).json({ message: "Email already in use" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    password: hashed,
    name,
    userType,
    phone,
  });
  const token = signJwt({
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    userType: user.userType,
    phone: user.phone,
  });

  res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);
  return res.status(201).json({
    message: "Signup successful",
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      userType: user.userType,
      phone: user.phone,
    },
  });
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  const user = await User.findOne({ email });
  if (!user)
    return res
      .status(401)
      .json({ message: "User not found invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: "Password incorrect" });

  const token = signJwt({
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    userType: user.userType,
    phone: user.phone,
  });
  res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);
  return res.status(201).json({
    message: "Login successful",
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      userType: user.userType,
    },
  });
}

export async function logout(req, res) {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
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
    const { email, name } = req.user;

    let user = await User.findOne({ email });
    const password = Math.floor(10000000 + Math.random() * 90000000).toString();
    const hashed = await bcrypt.hash(password, 10);

    if (!user) {
      user = await User.create({
        email,
        name,
        phone: "",
        userType: null,
        password: hashed,
      });
    } else {
      user.name = name;
      await user.save();
    }

    const token = signJwt({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      userType: user.userType,
      phone: user.phone,
    });

    res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);

    let redirectUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    if (!user.userType) {
      redirectUrl += "/selectUserType";
    } else if (user.userType === "Survivor") {
      redirectUrl += "/survivorDashboard";
    } else if (user.userType === "NGO") {
      redirectUrl += "/ngoDashboard";
    }

    res.redirect(redirectUrl);
  } catch (err) {
    console.error("Google authentication failed:", err);
    res.status(500).json({ message: "Google authentication failed" });
  }
}

export async function updateUserType(req, res) {
  const { userType } = req.body;
  const userId = req.user.id;
  if (!userType) {
    return res.status(400).json({ message: "User type is required" });
  }
  if (!["Survivor", "Volunteer", "NGO", "Supplier"].includes(userType)) {
    return res.status(400).json({ message: "Invalid user type" });
  }
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.userType = userType;
  await user.save();
  const token = signJwt({
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    userType: user.userType,
    phone: user.phone,
  });

  res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);
  return res.json({
    message: "User type updated",
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      userType: user.userType,
      phone: user.phone,
    },
  });
}

export async function updateUserProfile(req, res) {
  const userId = req.user.id;
  const { name, phone, address, emergencyContact } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (address !== undefined) user.address = address;
    if (emergencyContact !== undefined) user.emergencyContact = emergencyContact;

    await user.save();

    // Generate new token with updated info
    const token = signJwt({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      userType: user.userType,
      phone: user.phone,
    });

    res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);
    
    return res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        userType: user.userType,
        phone: user.phone,
        address: user.address,
        emergencyContact: user.emergencyContact,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ message: "Failed to update profile" });
  }
}

export async function validateDashboardAccess(req, res) {
  const { dashboardType } = req.params;
  const user = req.user;

  if (!user) {
    return res.status(401).json({ 
      message: "Authentication required",
      isAuthenticated: false 
    });
  }

  if (!user.userType) {
    return res.status(403).json({ 
      message: "User type not selected",
      requiresUserTypeSelection: true,
      isAuthenticated: true
    });
  }

  const dashboardUserTypeMap = {
    survivor: "Survivor",
    ngo: "NGO",
    volunteer: "Volunteer",
    supplier: "Supplier"
  };

  const requiredUserType = dashboardUserTypeMap[dashboardType.toLowerCase()];
  
  if (!requiredUserType) {
    return res.status(400).json({ message: "Invalid dashboard type" });
  }

  if (user.userType !== requiredUserType) {
    return res.status(403).json({ 
      message: `Access denied. This dashboard is only for ${requiredUserType} users.`,
      currentUserType: user.userType,
      requiredUserType: requiredUserType,
      isAuthenticated: true,
      hasCorrectUserType: false
    });
  }

  return res.json({ 
    message: "Access granted",
    isAuthenticated: true,
    hasCorrectUserType: true,
    userType: user.userType
  });
}
