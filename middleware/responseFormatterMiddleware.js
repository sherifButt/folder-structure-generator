module.exports = function (req, res, next) {
    // Use this method to send a response
    res.sendData = function (data=[],message="Success",status=200) {
        // Format the response
        const response = {
            status,
            message,
            success: true,
            data
        };

        // Send the response
        res.json(response);
    };

    // Call the next middleware function
    next();
};
