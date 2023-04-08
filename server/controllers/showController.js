import { ShowModel } from '../models/index.js';
import { createError } from '../utils/error.js';
import {
  addShow,
  getShows as getShowsLogic,
  getShowByID as getShowByIDLogic,
  getShowsByDates,
  getShowsInfo,
} from '../logic/show.js';

export const createNewShow = async (req, res, next) => {
  const show = req.body;

  try {
    const savedShow = await addShow(show);
    res.status(200).json(savedShow);
  } catch (error) {
    next(createError(500, error.message));
  }
};

export const getShows = async (req, res, next) => {
  const params = req.query;

  try {
    const shows = await getShowsLogic(params);
    res.status(200).json(shows);
  } catch (error) {
    next(createError(500, error.message));
  }
};

export const getShowByID = async (req, res, next) => {
  const showID = req.params.id;

  try {
    const show = await getShowByIDLogic(showID);
    res.status(200).json(show);
  } catch (error) {
    next(createError(500, error.message));
  }
};

export const getShowsBetweenDates = async (req, res) => {
  const minDate = new Date(req.body.minDate);
  const maxDate = new Date(req.body.maxDate);

  try {
    const shows = getShowsByDates(minDate, maxDate);
    res.status(200).json(shows);
  } catch (error) {
    next(createError(500, error.message));
  }
};

export const getShowsGroupByName = async (req, res, next) => {
  try {
    const docs = await getShowsInfo();
    res.status(200).json(docs);
  } catch (error) {
    next(createError(500, error.message));
  }
};
