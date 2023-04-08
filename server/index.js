import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {
  authRouter,
  showsRouter,
  ticketsRouter,
  userRouter,
} from './routes/index.js';
import { errorLoggerMiddleware, returnErrorMiddleware } from './utils/error.js';
import { connectToDB } from './models/index.js';

const PORT = 5000;
const app = express();

async function startup() {
  await connectToDB();

  app.use(cookieParser());
  app.use(express.json());
  app.use(cors());

  app.use('/auth', authRouter);
  app.use('/shows', showsRouter);
  app.use('/tickets', ticketsRouter);
  app.use('/user', userRouter);

  app.use(errorLoggerMiddleware);
  app.use(returnErrorMiddleware);

  app.listen(PORT, () => console.log(`listening on port ${PORT} 🐱🐱🐱`));
}

startup();
