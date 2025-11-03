import express from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { checkUserType } from '../middlewares/checkUserType.js';
import {
  createSupplier,
  getSupplierProfile,
  updateSupplier,
  getSuppliersWithItem,
} from '../controllers/supplier.js';

const router = express.Router();

// Create supplier profile
router.post('/create', isAuthenticated, checkUserType(['Supplier']), createSupplier);

// Get supplier profile
router.get('/profile', isAuthenticated, checkUserType(['Supplier']), getSupplierProfile);

// Update supplier profile
router.put('/update', isAuthenticated, checkUserType(['Supplier']), updateSupplier);

// Get suppliers with specific item (for NGOs)
router.get('/with-item', isAuthenticated, checkUserType(['NGO']), getSuppliersWithItem);

export default router;
