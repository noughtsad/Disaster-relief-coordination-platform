import { Router } from "express";
import { createNgo, getNgo, updateNgo, deleteNgo, getAllNgos, updateMyNgo } from "../controllers/ngo.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { checkUserType } from "../middlewares/checkUserType.js";
const router = Router();

router.post("/", isAuthenticated, checkUserType(["NGO"]), createNgo);
router.get("/all", isAuthenticated, getAllNgos); // Public endpoint for all authenticated users
router.put("/updateProfile", isAuthenticated, checkUserType(["NGO"]), updateMyNgo);
router.get("/:id", isAuthenticated, checkUserType(["NGO"]), getNgo);

export default router;