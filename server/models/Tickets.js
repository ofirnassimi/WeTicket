import mongoose from 'mongoose';

const TicketsSchema = new mongoose.Schema(
  {
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    show_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Show',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    can_separate: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true, collection: 'Tickets' }
);

export const model = mongoose.model('Tickets', TicketsSchema);
