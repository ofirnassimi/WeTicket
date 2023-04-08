import mongoose from 'mongoose';

const ShowSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    artist: {
      type: String,
      required: true,
    },
    date_time: {
      type: Date,
      required: true,
    },
    location: {
      type: {
        state: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        venue: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
  },
  { collection: 'Show' }
);

export const model = mongoose.model('Show', ShowSchema);
