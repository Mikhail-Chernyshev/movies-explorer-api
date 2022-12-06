// require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const auth = require("./middlewares/auth");
const { errors, celebrate, Joi } = require("celebrate");
const errorServer = require("./middlewares/error");
const apiRouter = require("./routes/index");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { PORT = 3001, MONGO_URL = "mongodb://localhost:27017/bitfilmsdb" } =
  process.env;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
});

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(requestLogger);

app.use("/", apiRouter);

app.use(errorLogger);

app.use(errors());
app.use((err, req, res, next) => {
  errorServer(err, res, next);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
