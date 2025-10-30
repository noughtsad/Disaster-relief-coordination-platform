import { Router } from "express";
import { signup, login, logout, me, googleAuth, updateUserType, validateDashboardAccess } from "../controllers/auth.js";
import passport from "../utils/passport.js";
import {isAuthenticated} from "../middlewares/isAuthenticated.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", me);
router.post("/updateUserType", isAuthenticated, updateUserType);
router.get("/validate/:dashboardType", isAuthenticated, validateDashboardAccess);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], accessType: "offline" })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: false }),
  googleAuth
);

export default router;