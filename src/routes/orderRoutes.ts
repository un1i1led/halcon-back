import { Router } from 'express';
import isAuthenticated from '../middleware/authMiddleware';
import { createOrder, deleteOrder, getAllOrders, getOrderById, updateOrder, uploadOrderImage } from '../controllers/orderController';
import { upload } from '../config/multer';
const router = Router();

router.get('/:customerNumber/:id', getOrderById);
router.get('/', isAuthenticated, getAllOrders);
router.post('/', isAuthenticated, createOrder);
router.post('/upload/:id', upload.single('image'), uploadOrderImage); 
router.put('/:id', isAuthenticated, updateOrder);
router.delete('/:id', isAuthenticated, deleteOrder);

export default router;