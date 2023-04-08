import express from 'express';
import {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
} from '../controllers/userController.js';
import { verifyToken, verifyUser, verifyAdmin } from '../utils/verifyToken.js';

export const router = express.Router();

router.put('/:id', verifyUser, updateUser);
router.delete('/:id', verifyUser, deleteUser);
router.get('/:id', getUser);
router.get('/', verifyAdmin, getAllUsers);
