// errorMiddleware.js
const httpStatus = require('http-status');

const splitCamelCaseString = (inputString) => {
    return inputString
        // insert a space before all caps
        .replace(/([A-Z])/g, ' $1')
        // uppercase the first character
        .replace(/^./, function (str) { return str.toUpperCase(); })
}

const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;

    // Check for duplicate key error
    // if (err.code && err.code === 11000) {
    //     let fieldName = Object.keys(err.keyPattern)[0];
    //     // fieldName = splitCamelCaseString(fieldName);
    //     const match = err.errmsg.match(/(["'])(\\?.)*?\1/);
    //     const value = match ? match[0] : '';
    //     message = `Duplicate ${fieldName}: ${value}. Please use another value!`;
    //     statusCode = httpStatus.BAD_REQUEST;
    // }

    // Check for Mongoose Validation Error
    // if (err.name && err.name === 'ValidationError') {
    //     const errorKeys = Object.values(err.errors).map(e => splitCamelCaseString(e.path));
    //     if (errorKeys.length > 1) {
    //         message = `Missing: ${errorKeys.join(' and ')} fields. All of Paths ${errorKeys.map(k => `\`${k}\``).join(' and ')} are required.`;
    //     } else {
    //         message = `Missing: ${splitCamelCaseString(errorKeys[0])} field, is required.`;
    //     }
    //     statusCode = httpStatus.BAD_REQUEST;
    // }

    
    // Check for Mongoose Cast Error
    statusCode = statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    message = message || 'Something went wrong!';

    console.error('Error: ',err.message); // You might want to use a logging library here instead

    // Send the error response
    res.status(statusCode).json({
        status: statusCode,
        success: false,
        message,
        error: err,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {},
    });
};

// Handle 404 errors
const notFoundError = (req, res, next) => {
    const err = new Error(`Not Found - ${req.originalUrl}`);
    err.statusCode = httpStatus.NOT_FOUND;
    next(err);
};

module.exports = {
    errorHandler,
    notFoundError
};
