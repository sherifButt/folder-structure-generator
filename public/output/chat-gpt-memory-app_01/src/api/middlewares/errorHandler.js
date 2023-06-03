const express = require('express')

/**
 * Handle and respond to errors in the Express app
 * @param {Error} err - The error object being handled
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal server error'
  res.status(statusCode).json({ success: false, message })
}

module.exports = errorHandler
