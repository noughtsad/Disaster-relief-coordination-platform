import { verifyJwt } from "../utils/jwt.js";

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies?.token || req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Authentication token missing or invalid" });

  try {
    const decoded = verifyJwt(token);
    req.user = decoded;
    console.log("Authenticated user:", req.user);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
