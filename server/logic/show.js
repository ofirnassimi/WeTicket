import { ShowModel } from '../models/index.js';
import 'dotenv/config';

export const addShow = async (show) => {
  const showExist = await doesShowExist(show);

  if (!showExist) {
    show = await addImageURL(show);

    try {
      const savedShow = await saveShow(show);
      return savedShow;
    } catch (error) {
      throw error;
    }
  }

  return getShowDoc(show);
};

const doesShowExist = async (show) => {
  const { name, artist, date_time, location } = show;
  const showInfo = {
    name,
    artist,
    date_time,
    'location.state': location.state,
    'location.city': location.city,
    'location.venue': location.venue,
  };

  const doc = await ShowModel.findOne(showInfo).exec();
  return doc ? true : false;
};

const addImageURL = async (show) => {
  let imageURL = await getImageURLFromDB(show.name, show.artist);

  if (!imageURL) {
    imageURL = await getImageURL(show.name, show.artist);
  }

  show.image_url = imageURL;
  return show;
};

const getImageURLFromDB = async (name, artist) => {
  const doc = await ShowModel.findOne({ name: name, artist: artist }).exec();
  return doc ? doc.image_url : null;
};

const getImageURL = async (name, artist) => {
  const imageString = `${name} ${artist}`;
  let imageURL;

  await fetch(
    `https://customsearch.googleapis.com/customsearch/v1?cx=${process.env.GOOGLE_SEARCH_ENGINE_ID}&q=${imageString}&key=${process.env.GOOGLE_SEARCH_API_KEY}&searchType=image&imgSize=medium`
  )
    .then((response) => response.json())
    .then((responseJSON) => (imageURL = responseJSON.items[0].link));

  return imageURL;
};

const saveShow = async (showInfo) => {
  const show = new ShowModel(showInfo);
  const savedShow = await show.save();
  return savedShow;
};

const getShowDoc = async (show) => {
  const { name, artist, date_time, location } = show;
  const showInfo = {
    name,
    artist,
    date_time,
    'location.state': location.state,
    'location.city': location.city,
    'location.venue': location.venue,
  };

  const showDoc = await ShowModel.findOne(showInfo);
  return showDoc;
};

export const getShows = async (params) => {
  try {
    const shows = await ShowModel.find(params);
    return shows;
  } catch (error) {
    throw error;
  }
};

export const getShowByID = async (showID) => {
  try {
    const show = await ShowModel.findById(showID);
    return show;
  } catch (error) {
    throw error;
  }
};

export const getShowsByDates = async (minDate, maxDate) => {
  try {
    const shows = await ShowModel.find({
      date_time: {
        $gte: minDate,
        $lt: maxDate,
      },
    });
    return shows;
  } catch (error) {
    throw error;
    //throw createError(500, error.message);
  }
};

// Is this name OK? The function returns all the shows grouped by name and artist
export const getShowsInfo = async () => {
  try {
    const docs = await ShowModel.aggregate([
      {
        $group: {
          _id: { name: '$name', artist: '$artist' },
          showInfo: {
            $push: {
              date_time: '$date_time',
              location: '$location',
              image_url: '$image_url',
            },
          },
        },
      },
    ]);
    return docs;
  } catch (error) {
    throw error;
  }
};
