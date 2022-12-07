class AccessError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}
class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}
class CastError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}
class ErrorRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}
module.exports = {
  AccessError,
  AuthError,
  CastError,
  ErrorRequest,
  NotFoundError,
  ValidationError,
};
