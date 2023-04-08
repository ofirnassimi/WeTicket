import express from 'express';
import {
  createNewShow,
  getShows,
  getShowByID,
  getShowsBetweenDates,
  getShowsGroupByName,
} from '../controllers/showController.js';

export const router = express.Router();

router.post('/', createNewShow);

router.get('/', getShows);
router.get('/betweenDates', getShowsBetweenDates);
router.get('/groupby', getShowsGroupByName);
router.get('/:id', getShowByID);
