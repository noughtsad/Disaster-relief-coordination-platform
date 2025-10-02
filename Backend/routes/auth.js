import { Router } from "express";
import { signup, login, logout, me, googleAuth } from "../controllers/auth.js";
import passport from "../utils/passport.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", me);


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