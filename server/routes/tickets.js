import express from 'express';
import {
  createTickets,
  reduceQuantity,
  getTickets,
} from '../controllers/ticketsController.js';

export const router = express.Router();

router.post('/', createTickets);
router.put('/', reduceQuantity);
router.get('/', getTickets);
