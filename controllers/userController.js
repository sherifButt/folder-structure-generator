const User = require('../models/User');
const Project = require('../models/Project');

// @route  GET api/users 
// @desc   Get all users
// @access Public
exports.getAllUsers =  async (req, res, next) => {
    try {
        const users = await User.find().populate('projects');
        // Send the data
        res.sendData(users);
    } catch (err) {
        next(err); // Pass the error to Express 
    }
}

// @route  POST api/users
// @desc   Register new user 
// @access Public
exports.createUser = async (req, res, next) => {
    // You'd typically validate the request body here
    const { username, email, password } = req.body;

    try {
        // Create a new user  
        const user = new User({
            username,
            email,
            password // Remember to hash the password before storing it
        });
        // if username invalid return error
        await user.save();
        
        // Send the data
        res.sendData(user, 'User registered successfully!');
    } catch (err) {
        next(err); // Pass the error to Express
    }
}

// @route  GET api/users/:id
// @desc   Get a single user
// @access Public
exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).populate('projects');

        // Send the data
        res.sendData(user,'User found successfully!');
    } catch (err) {
        next(err); // Pass the error to Express
    }
}

// @route  DELETE api/users/:id
// @desc   Delete a single user
// @access Public
exports.deleteUserById = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        // Delete the user's projects
        await Project.deleteMany({ user_id: req.params.id });

        // Send the data
        res.sendData(user,'User deleted successfully!');
    } catch (err) {
        next(err); // Pass the error to Express
    }
}

// @route  PUT api/users/:id
// @desc   Update a user
// @access Public
exports.updateUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        Object.assign(user, req.body);
        await user.save();
        // Send the data
        res.sendData(user,'User updated successfully!');

    } catch (err) {
        next(err); // Pass the error to Express
    }
}