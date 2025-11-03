import express from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { checkUserType } from '../middlewares/checkUserType.js';
import {
  addInventoryItem,
  getMyInventory,
  getLowStockItems,
  updateInventoryItem,
  deleteInventoryItem,
} from '../controllers/inventory.js';

const router = express.Router();

// Add inventory item
router.post('/add', isAuthenticated, checkUserType(['Supplier']), addInventoryItem);

// Get all inventory items
router.get('/my-inventory', isAuthenticated, checkUserType(['Supplier']), getMyInventory);

// Get low stock items
router.get('/low-stock', isAuthenticated, checkUserType(['Supplier']), getLowStockItems);

// Update inventory item
router.put('/update/:itemId', isAuthenticated, checkUserType(['Supplier']), updateInventoryItem);

// Delete inventory item
router.delete('/delete/:itemId', isAuthenticated, checkUserType(['Supplier']), deleteInventoryItem);

export default router;
