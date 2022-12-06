const router = require("express").Router();

const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { validateRegister, validateLogin } = require("../utils/validate");

router.post("/signup", validateRegister, createUser);

router.post("/signin", validateLogin, login);

router.use(auth);

router.use("/users", require("./users"));

router.use("/movies", require("./movies"));

router.use("*", (req, res, next) => {
  next(new NotFoundError("Маршрут не найден"));
});

module.exports = router;
