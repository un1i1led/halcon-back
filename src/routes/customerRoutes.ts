import { Router } from 'express';
import isAuthenticated from '../middleware/authMiddleware';
import { createCustomer, deleteCustomer, getAllCustomers, updateCustomer } from '../controllers/customerController';
const router = Router();

router.get('/', isAuthenticated, getAllCustomers);
router.post('/', isAuthenticated, createCustomer);
router.put('/:id', isAuthenticated, updateCustomer);
router.delete('/:id', isAuthenticated, deleteCustomer);

export default router;