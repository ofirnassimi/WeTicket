import { TicketsModel } from '../models/index.js';
import { addShow } from '../logic/show.js';

export const addTickets = async (show, ticketsInfo) => {
  let savedShow;
  try {
    savedShow = await addShow(show);
  } catch (error) {
    throw error;
  }

  const showID = savedShow._id;
  const tickets = new TicketsModel({
    seller_id: ticketsInfo.sellerID,
    show_id: showID,
    quantity: ticketsInfo.quantity,
    price: ticketsInfo.price,
    can_separate: ticketsInfo.canSeparate,
  });

  try {
    const savedTickets = await tickets.save();
    return savedTickets;
  } catch (error) {
    throw error;
  }
};

export const reduceQuantity = async (info) => {
  let tickets, newQuantity;
  const { ticketsID } = info;
  try {
    tickets = await TicketsModel.findById(ticketsID);
  } catch (error) {
    throw error;
  }

  if (tickets.can_separate) {
    newQuantity = tickets.quantity - info.ticketsSold;
  } else {
    throw new Error("Can't sell tickets separately");
  }

  try {
    const newTickets = await TicketsModel.findByIdAndUpdate(info.ticketsID, {
      quantity: newQuantity,
    });
    return newTickets;
  } catch (error) {
    throw error;
  }
};

export const getTickets = async (params) => {
  try {
    const tickets = await TicketsModel.find(params);
    return tickets;
  } catch (error) {
    throw error;
  }
};
