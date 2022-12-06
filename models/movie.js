const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;

const movieSchema = new Schema(
  {
    country: { type: String, required: true },
    director: { type: String, required: true },
    duration: { type: Number, required: true },
    year: { type: String, required: true },
    description: { type: String, required: true },
    image: {
      type: String,
      required: true,
      validate: { validator: (value) => validator.isURL(value) },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: { validator: (value) => validator.isURL(value) },
    },
    thumbNail: {
      type: String,
      required: true,
      validate: { validator: (value) => validator.isURL(value) },
    },
    owner: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
    movieId: { type: String, required: true },
    nameRU: { type: String, required: true },
    nameEN: { type: String, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("movie", movieSchema);
