const { default: mongoose } = require("mongoose");
const Movie = require("../models/movie");
const {
  NotFoundError,
  AccessError,
  CastError,
} = require("../errors/errors.js");

const getMovies = async (req, res, next) => {
  try {
    const cards = await Movie.find({});
    return res.send(cards);
  } catch (err) {
    next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie == null) {
      return next(new NotFoundError("Card with this id not found"));
    }
    if (card.owner._id.toString() !== req.user._id.toString()) {
      return next(new AccessError("You can not delete this card"));
    }
    await movie.remove();
    return res.send(movie);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return next(new CastError("Not correct data"));
    }
    next(err);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbNail,
      movieId,
    } = req.body;
    const owner = req.user;
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbNail,
      movieId,
      owner,
    });
    return res.send(movie);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new CastError("Not correct data"));
    }
    next(err);
  }
};
module.exports = {
  getMovies,
  deleteMovie,
  createMovie,
};
