import express from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { checkUserType } from '../middlewares/checkUserType.js';
import {
  createFulfillmentRequest,
  acceptFulfillmentRequest,
  rejectFulfillmentRequest,
  dispatchFulfillment,
  markAsDelivered,
  getMyFulfillments,
  getFulfillmentsForRequest,
  rateSupplier,
} from '../controllers/fulfillment.js';

const router = express.Router();

// NGO creates fulfillment request to supplier
router.post('/create', isAuthenticated, checkUserType(['NGO']), createFulfillmentRequest);

// Supplier accepts fulfillment request
router.put('/accept/:fulfillmentId', isAuthenticated, checkUserType(['Supplier']), acceptFulfillmentRequest);

// Supplier rejects fulfillment request
router.put('/reject/:fulfillmentId', isAuthenticated, checkUserType(['Supplier']), rejectFulfillmentRequest);

// Supplier dispatches order
router.put('/dispatch/:fulfillmentId', isAuthenticated, checkUserType(['Supplier']), dispatchFulfillment);

// Mark as delivered (can be done by NGO or Supplier)
router.put('/delivered/:fulfillmentId', isAuthenticated, checkUserType(['NGO', 'Supplier']), markAsDelivered);

// Get fulfillment requests for supplier
router.get('/my-fulfillments', isAuthenticated, checkUserType(['Supplier']), getMyFulfillments);

// Get fulfillments for a specific request (for NGO)
router.get('/request/:requestId', isAuthenticated, checkUserType(['NGO']), getFulfillmentsForRequest);

// Rate supplier after delivery
router.post('/rate/:fulfillmentId', isAuthenticated, checkUserType(['NGO']), rateSupplier);

export default router;
