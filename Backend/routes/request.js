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

router.post('/create', isAuthenticated, checkUserType(['Survivor']), createRequest);

router.get('/all', isAuthenticated, checkUserType(['NGO', 'Volunteer', 'Supplier']), getAllRequests);

router.get("/ngo-map", isAuthenticated, getRequestsForNgoMap);

router.get('/my-requests', isAuthenticated, checkUserType(['Survivor']), getMyRequests);

router.get("/my-accepted-requests", isAuthenticated, getMyAcceptedRequests);

router.get("/my-ngo-requests", isAuthenticated, checkUserType(['NGO']), getMyNgoRequests);

router.post('/accept/:requestId', isAuthenticated, checkUserType(['NGO', 'Volunteer', 'Supplier']), acceptRequest);

router.post("/withdraw/:requestId", isAuthenticated, withdrawFromRequest);

router.get("/responders/:requestId", isAuthenticated, getRequestResponders);

router.put('/complete/:requestId', isAuthenticated, checkUserType(['Survivor']), markRequestComplete);

router.put('/verify/:requestId', isAuthenticated, checkUserType(['Volunteer']), verifyRequestByVolunteer);

router.put("/status/:requestId", isAuthenticated, updateRequestStatus);

router.get("/by-location", isAuthenticated, getRequestsByLocation);

export default router;
