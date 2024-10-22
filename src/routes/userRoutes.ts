import { Router } from 'express';
import isAuthenticated from '../middleware/authMiddleware';
import { getAllUsers, createUser, updateUser, deleteUser } from '../controllers/userController';
const router = Router();

router.get('/', isAuthenticated, getAllUsers);
router.post('/', isAuthenticated, createUser);
router.put('/:id', isAuthenticated, updateUser);
router.delete('/:id', isAuthenticated, deleteUser);

export default router;