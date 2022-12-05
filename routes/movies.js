const router = require("express").Router();

const { getMovies, deleteMovie, createMovie } = require("../controllers/movies");


router.get("/", getMovies);

router.post("/", createMovie);

router.delete("/:id", deleteMovie);

module.exports = router;
