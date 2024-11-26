import express from 'express';
import { placeOrder, getAllOrders } from '../controllers/orderController.js';

const router = express.Router();

// Place a new order
router.post('/', placeOrder);

// Get all orders (optional endpoint for admin or overview)
router.get('/', getAllOrders);

export default router;