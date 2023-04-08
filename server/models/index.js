import mongoose from 'mongoose';
import 'dotenv/config';

export { model as ShowModel } from './Show.js';
export { model as TicketsModel } from './Tickets.js';
export { model as UserModel } from './User.js';

export async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB 🌈');
  } catch (error) {
    console.error(error);
  }
}
