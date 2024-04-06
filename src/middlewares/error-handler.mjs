import {validationResult} from 'express-validator';

/**
 * Custom error generator
 * @param {string} message - error message
 * @param {number} [status] - optional error status, default is 500
 * @param {array} [errors] - optional array of error objects
 * @return {object} error object
 */
const customError = (message, status, errors) => {
  const error = new Error(message);
  error.status = status || 500;
  if (errors) {
    error.errors = errors;
  }
  return error;
};

/**
 * Generic 404 handler
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {function} next - next function
 */
const notFoundHandler = (req, res, next) => {
  const error = customError(`Not Found - ${req.originalUrl}`, 404);
  next(error); // forward error to error handler
};

/**
 * Custom default middleware for handling errors
 * @param {object} err - error object
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {function} next - next function
 */
const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500); // default is 500 if err.status is not defined
  console.log('errorHandler', err.message, err.status, err.errors);
  res.json({
    error: {
      message: err.message,
      status: err.status || 500,
      errors: err.errors,
    },
  });
};

/**
 * Custom middleware for handling and formatting validation errors
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {function} next - next function
 * @return {*} next function call
 */
const validationErrorHandler = (req, res, next) => {
  const errors = validationResult(req, {strictParams: ['body']});
  if (!errors.isEmpty()) {
    // console.log('validation errors', errors.array({onlyFirstError: true}));
    const error = customError('Bad Request', 400);
    error.errors = errors.array({onlyFirstError: true}).map((error) => {
      return {field: error.path, message: error.msg};
    });
    return next(error);
  }
  next();
};

export {customError, notFoundHandler, errorHandler, validationErrorHandler};