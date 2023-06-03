const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY

module.exports = function (req, res, next) {
    // pass if the request is a GET request
    if (req.method === 'GET') {
        next();
        return;
    }

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    try {
        if (token == null) return res.sendStatus(401); // Unauthorized

        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) return res.sendStatus(403); // Forbidden
            req.user = user._id;
            next();
        });
    } catch (err) {
        next(err)
    }

};
