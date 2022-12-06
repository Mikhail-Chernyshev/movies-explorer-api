const { default: mongoose } = require("mongoose");
const Movie = require("../models/movie");
const {
  NotFoundError,
  AccessError,
  CastError,
} = require("../errors/errors.js");

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({owner: req.user._id});
    if (movies == null) {
      return next(new NotFoundError("Card with this owner not found"));
    }
    return res.send(movies);
  } catch (err) {
    next(err);
  }
};
// try {
//   const card = await Card.findById(req.params.cardId);
//   if (card == null) {
//     return next(new NotFoundError('Card with this id not found'));
//   }
//   if (card.owner._id.toString() !== req.user._id.toString()) {
//     return next(new AccessError('You can not delete this card'));
//   } await card.remove();
//   return res.send(card);
// } catch (err) {
//   if (err instanceof mongoose.Error.CastError) {
//     return next(new CastError('Not correct data'));
//   }
//   next(err);
// }
// };
const deleteMovie = async (req, res, next) => {
  try {
    console.log(req.params)
    const movie = await Movie.findById(req.params.movieId);
    if (movie == null) {
      return next(new NotFoundError("Movie with this id not found"));
    }
    if (movie.owner.toString() !== req.user._id.toString()) {
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
      thumbnail,
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
      thumbnail,
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
