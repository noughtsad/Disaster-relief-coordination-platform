import { Router } from "express";
import { 
  createRequest, 
  getAllRequests, 
  getMyRequests, 
  acceptRequest, 
  updateRequestStatus,
  getRequestsByLocation 
} from "../controllers/request.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = Router();

// Create a new request (Survivors)
router.post("/create", isAuthenticated, createRequest);

// Get all requests (NGOs/Volunteers/Suppliers)
router.get("/all", isAuthenticated, getAllRequests);

// Get my requests (Survivors)
router.get("/my-requests", isAuthenticated, getMyRequests);

// Accept a request (NGOs/Volunteers/Suppliers)
router.post("/accept/:requestId", isAuthenticated, acceptRequest);

// Update request status
router.put("/status/:requestId", isAuthenticated, updateRequestStatus);

// Get requests by location
router.get("/by-location", isAuthenticated, getRequestsByLocation);

export default router;
