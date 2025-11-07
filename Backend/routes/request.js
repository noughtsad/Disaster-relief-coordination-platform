import express from 'express';
import {
  createRequest,
  getAllRequests,
  getMyRequests,
  acceptRequest,
  markRequestComplete,
  verifyRequestByVolunteer, // Import the new function
  updateRequestStatus,
  getRequestsByLocation,
  getRequestResponders,
  withdrawFromRequest,
  getMyAcceptedRequests,
  getRequestsForNgoMap,
  getMyNgoRequests // Add this import
} from '../controllers/request.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { checkUserType } from '../middlewares/checkUserType.js';

const router = express.Router();

// Create a new request (Survivor)
router.post('/create', isAuthenticated, checkUserType(['Survivor']), createRequest);

// Get all requests (NGO/Volunteer)
router.get('/all', isAuthenticated, checkUserType(['NGO', 'Volunteer', 'Supplier']), getAllRequests);

// Get requests for NGO map (pending + accepted by this NGO)
router.get("/ngo-map", isAuthenticated, getRequestsForNgoMap);

// Get user's own requests (Survivor)
router.get('/my-requests', isAuthenticated, checkUserType(['Survivor']), getMyRequests);

// Get my accepted requests (NGOs/Volunteers/Suppliers)
router.get("/my-accepted-requests", isAuthenticated, getMyAcceptedRequests);

// Get all requests for the current NGO
router.get("/my-ngo-requests", isAuthenticated, checkUserType(['NGO']), getMyNgoRequests);

// Accept a request (NGO/Volunteer/Supplier)
router.post('/accept/:requestId', isAuthenticated, checkUserType(['NGO', 'Volunteer', 'Supplier']), acceptRequest);

// Withdraw from a request (NGOs/Volunteers/Suppliers)
router.post("/withdraw/:requestId", isAuthenticated, withdrawFromRequest);

// Get responders for a request
router.get("/responders/:requestId", isAuthenticated, getRequestResponders);

// Mark request as complete (Survivor)
router.put('/complete/:requestId', isAuthenticated, checkUserType(['Survivor']), markRequestComplete);

// Verify request completion (Volunteer)
router.put('/verify/:requestId', isAuthenticated, checkUserType(['Volunteer']), verifyRequestByVolunteer);

// Update request status (generic)
router.put("/status/:requestId", isAuthenticated, updateRequestStatus);

// Get requests by location
router.get("/by-location", isAuthenticated, getRequestsByLocation);

export default router;
