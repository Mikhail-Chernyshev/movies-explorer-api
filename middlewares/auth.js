const jwt = require('jsonwebtoken');
const {AuthError} = require('../errors/errors');

const { NODE_ENV, JWT_SECRET } = process.env;

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const tokenIs = req.headers.authorization;
  if (!tokenIs) {
    return next(new AuthError('You are not authorized'));
  }

  const token = extractBearerToken(tokenIs);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new AuthError('You are not authorized'));
  }
  req.user = payload;

  next();
};
