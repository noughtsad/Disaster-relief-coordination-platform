import { Router } from "express";
import { 
  createRequest, 
  getAllRequests, 
  getMyRequests, 
  acceptRequest, 
  updateRequestStatus,
  getRequestsByLocation,
  getRequestResponders,
  withdrawFromRequest,
  getMyAcceptedRequests
} from "../controllers/request.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = Router();

// Create a new request (Survivors)
router.post("/create", isAuthenticated, createRequest);

// Get all requests (NGOs/Volunteers/Suppliers)
router.get("/all", isAuthenticated, getAllRequests);

// Get my requests (Survivors)
router.get("/my-requests", isAuthenticated, getMyRequests);

// Get my accepted requests (NGOs/Volunteers/Suppliers)
router.get("/my-accepted-requests", isAuthenticated, getMyAcceptedRequests);

// Accept a request (NGOs/Volunteers/Suppliers)
router.post("/accept/:requestId", isAuthenticated, acceptRequest);

// Withdraw from a request (NGOs/Volunteers/Suppliers)
router.post("/withdraw/:requestId", isAuthenticated, withdrawFromRequest);

// Get responders for a request
router.get("/responders/:requestId", isAuthenticated, getRequestResponders);

// Update request status
router.put("/status/:requestId", isAuthenticated, updateRequestStatus);

// Get requests by location
router.get("/by-location", isAuthenticated, getRequestsByLocation);

export default router;
