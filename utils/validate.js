const { celebrate, Joi } = require("celebrate");

const validateRegister = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateEditUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
})

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string()
      .required()
      .regex(
        /http(s?):\/\/(www\.)?[0-9a-zA-Z-]+\.[a-zA-Z]+([0-9a-zA-Z-._~:/?#[\]@!$&'()*+,;=]+)/
      ),
    trailerLink: Joi.string()
      .required()
      .regex(
        /http(s?):\/\/(www\.)?[0-9a-zA-Z-]+\.[a-zA-Z]+([0-9a-zA-Z-._~:/?#[\]@!$&'()*+,;=]+)/
      ),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string()
      .required()
      .regex(
        /http(s?):\/\/(www\.)?[0-9a-zA-Z-]+\.[a-zA-Z]+([0-9a-zA-Z-._~:/?#[\]@!$&'()*+,;=]+)/
      ),
    movieId: Joi.string().required(),
  }),
});

module.exports = {
  validateRegister,
  validateLogin,
  validateDeleteMovie,
  validateCreateMovie,
  validateEditUser
};
