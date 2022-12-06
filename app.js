require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const helmet = require("helmet");
const { errors} = require("celebrate");
const errorServer = require("./middlewares/error");
const apiRouter = require("./routes/index");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { PORT = 3001, MONGO_URL = "mongodb://localhost:27017/bitfilmsdb" } =
  process.env;
// const limiter = require("./utils/limiter");
// const rateLimit = require("express-rate-limit");

// const limiter = rateLimit({
  // windowMs: 15 * 60 * 1000,
  // max: 100,
// });

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
});

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
// app.use(limiter);
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
