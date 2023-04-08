import { TicketsModel } from '../models/index.js';
import {
  addTickets,
  reduceQuantity as reduceQuantityLogic,
  getTickets as getTicketsLogic,
} from '../logic/tickets.js';
import { createError } from '../utils/error.js';

export const createTickets = async (req, res, next) => {
  const { body } = req;
  const {
    name,
    artist,
    date_time,
    location,
    seller_id,
    quantity,
    price,
    can_separate,
  } = body;

  const show = { name, artist, date_time, location };

  const ticketsInfo = {
    sellerID: seller_id,
    quantity,
    price,
    canSeparate: can_separate,
  };

  try {
    const savedTickets = addTickets(show, ticketsInfo);
    res.status(200).json(savedTickets);
  } catch (error) {
    next(createError(500, error.message));
  }
};

export const reduceQuantity = async (req, res, next) => {
  const { body } = req;
  const { tickets_id, sold } = body;

  const info = {
    ticketsID: tickets_id,
    ticketsSold: sold,
  };

  try {
    const newTickets = reduceQuantityLogic(info);
    res.status(200).json(newTickets);
  } catch (error) {
    next(createError(500, error.message));
  }
};

export const getTickets = async (req, res, next) => {
  const params = req.query;
  try {
    const tickets = await getTicketsLogic(params);
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json(error);
  }
};
