import express from "express";
import { getChatMessages } from "../controllers/chat.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.get("/:requestId", isAuthenticated, getChatMessages);

export default router;
