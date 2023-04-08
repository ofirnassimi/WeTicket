import express from 'express';
import { register, login } from '../controllers/authController.js';

export const router = express.Router();

router.post('/login', login);
router.post('/register', register);
