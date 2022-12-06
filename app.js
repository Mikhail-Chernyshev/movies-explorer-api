require('dotenv').config();
const express = require("express");
const { PORT = 3001 } = process.env;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const auth = require("./middlewares/auth");
const { createUser, login } = require("./controllers/users");
const { errors, celebrate, Joi } = require("celebrate");
const errorServer = require("./middlewares/error");
const routesUsers = require("./routes/users");
const routesMovies = require("./routes/movies");
const { requestLogger, errorLogger } = require("./middlewares/logger");

mongoose.connect("mongodb://localhost:27017/bitfilmsdb", {
  useNewUrlParser: true,
});

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(requestLogger);

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login
);
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser
);

app.use(auth);

app.use("/users", routesUsers);
app.use("/movies", routesMovies);
app.use("*", (req, res, next) => {
  next(new NotFoundError("Маршрут не найден"));
});
app.use(errorLogger);

app.use(errors());
app.use((err, req, res, next) => {
  errorServer(err, res, next);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
