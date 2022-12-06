const router = require("express").Router();

const {
  getMovies,
  deleteMovie,
  createMovie,
} = require("../controllers/movies");
const {
  validateDeleteMovie,
  validateCreateMovie,
} = require("../utils/validate");

router.get("/", getMovies);

router.post("/", validateCreateMovie, createMovie);

router.delete("/:id", validateDeleteMovie, deleteMovie);

module.exports = router;
