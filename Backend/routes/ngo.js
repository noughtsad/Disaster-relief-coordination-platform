import { Router } from "express";
import { createNgo, getNgo, updateNgo, deleteNgo } from "../controllers/ngo.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
const router = Router();

router.post("/", isAuthenticated, createNgo);
router.get("/:id", isAuthenticated, getNgo);

export default router;