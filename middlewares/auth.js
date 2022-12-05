const jwt = require('jsonwebtoken');
// const { SECRET_JWT } = require('../utils/constants');
const {AuthError} = require('../errors/errors');

const { NODE_ENV, JWT_SECRET } = process.env;

const extractBearerToken = (header) => header.replace('Bearer ', '');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const tokenIs = req.headers.authorization;
  if (!tokenIs) {
    return next(new AuthError('You are not authorized'));
  }

  const token = extractBearerToken(tokenIs);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    // payload = jwt.verify(token, SECRET_JWT);
  } catch (err) {
    return next(new AuthError('You are not authorized'));
  }
  req.user = payload;

  next();
};
