import { Router } from "express";
import { createNgo, getNgo, updateNgo, deleteNgo } from "../controllers/ngo.js";
const router = Router();

router.post("/", createNgo);
router.get("/:id", getNgo);
router.put("/:id", updateNgo);
router.delete("/:id", deleteNgo);

export default router;