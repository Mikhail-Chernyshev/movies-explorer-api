const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const {
  NotFoundError,
  AccessError,
  CastError,
  ErrorRequest,
  AuthError,
  ValidationError,
} = require("../errors/errors.js");
const { NODE_ENV, JWT_SECRET } = process.env;

const getMe = (req, res, next) => {
  console.log(req)
  User.findById(req.user)
    .then((user) => {
      if (!user) {
        return next(new CastError("Not correct data"));
      }
      return res.status(200).send(user);
    })
    .catch((err) => next(err));
};

const createUser = (req, res, next) => {
  const { body } = req;
  const { email, password, name, about, avatar } = body;
  bcrypt
    .hash(password, 10)
    .then((hashPassword) =>
      User.create({
        email,
        password: hashPassword,
        name,
        about,
        avatar,
      })
    )
    .then((data) => res.status(200).send(data))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.code === 11000) {
        next(
          new ErrorRequest("Пользователь с таким email уже зарегистрирован")
        );
      } else if (err.name === "ValidationError") {
        next(new ValidationError("Wrong name"));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select("+password")
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return next(new AuthError("Wrong email or password"));
      }
      // eslint-disable-next-line consistent-return
      bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
          return next(new AuthError("Wrong email or password"));
        }
        // eslint-disable-next-line max-len
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
          { expiresIn: "7d" }
        );
        // const token = signToken(user.id);
        // const token = jwt.sign(user.id, SECRET_JWT);
        res.status(200).send({ token, message: "Athorization successful" });
        if (!token) return next(new AuthError("Wrong email or password"));
      });
    })
    .catch((err) => next(err));
};

const editMe = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user,
      { name, email },
      { new: true, runValidators: true },
    );
    if (user == null) {
      return next(new NotFoundError('User with this id not found'));
    }
    return res.send(user);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return next(new CastError('Not correct data'));
    }
    if (err.name === 'ValidationError') {
      return next(new CastError('Not correct data'));
    }
    next(err);
  }
};
module.exports = {
  getMe,
  createUser,
  login,
  editMe
};
