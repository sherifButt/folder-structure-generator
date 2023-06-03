const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { validateUsername, validateEmail, validatePassword } = require('../utils/validators');
const validate = require('../utils/validate');
const SECRET_KEY = process.env.JWT_SECRET_KEY;


exports.loginUser = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            throw ({ message: 'Username and password must be provided', statusCode: 400 });
        }

        const user = await User.findOne({ username });

        if (!user) {
            throw ({ message: 'User not found', statusCode: 404 });
        }

        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ _id: user._id }, SECRET_KEY);
            res.status(201).json({ token });
        } else {
            throw ({ message: 'Invalid username or password', statusCode: 401 });
        }
    } catch (err) {
        next(err)
    }
};

exports.registerUser = async (req, res, next) => {
    let { username, password, email,confirmPassword } = req.body;

    try {
        // check if username, email and password are provided
        if (!username || !password || !email||!confirmPassword)
            throw ({ message: 'Username, email, password and confirm password are required', statusCode: 400 });
        
        // check if password and confirm password are the same
        if (password !== confirmPassword)
            throw ({ message: 'Password and confirm password must be the same', statusCode: 400 });
            
        //    const errors =  validate({ username, password, email })
        //    console.log(errors)
        //       if(errors){throw errors}

        // validate username, email and password
        // if (!validateUsername(username))
        //     throw ({ message: `Username [${username}] must be at least 3 characters long and no space between`, statusCode: 400 });
        // if (!validateEmail(email))
        //     throw ({ message: `Email [${email}] is not valid email format, should be [youremail@domain.com]`, statusCode: 400 });
        // if (!validatePassword(password))
        //     throw ({ message: `Password [${password}] must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number`, statusCode: 400 });

        // check if username or email already exists
        const existingUser = await User.findOne({ username });
        if (existingUser)
            throw ({ message: `Username [${username}] is already taken`, statusCode: 409 });

        const existingEmail = await User.findOne({ email });
        if (existingEmail)
            throw ({ message: `Email [${email}] is already taken`, statusCode: 409 });

        const user = new User({ username, password, email });
        await user.save();

        const token = jwt.sign({ _id: user._id }, SECRET_KEY);
        res.json({ token })
    }
    catch (err) {
        next(err)
    }
};
