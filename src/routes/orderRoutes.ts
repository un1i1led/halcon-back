import { Router } from 'express';
import isAuthenticated from '../middleware/authMiddleware';
import { createOrder, deleteOrder, getAllOrders, getOrderById, updateOrder } from '../controllers/orderController';
const router = Router();

router.get('/:customerNumber/:id', getOrderById);
router.get('/', isAuthenticated, getAllOrders);
router.post('/', isAuthenticated, createOrder);
router.put('/:id', isAuthenticated, updateOrder);
router.delete('/:id', isAuthenticated, deleteOrder);

export default router;