const express = require('express');

/**
 * Express middleware to handle errors and send appropriate response.
 * @param {*} err - Error object.
 * @param {*} req - Request object.
 * @param {*} res - Response object.
 * @param {*} next - Next middleware.
 */
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const error = process.env.NODE_ENV === 'production' ? {} : err;

  res.status(statusCode).json({
    success: false,
    message,
    error,
  });
}

module.exports = errorHandler;
