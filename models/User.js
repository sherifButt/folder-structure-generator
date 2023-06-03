const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const {validateEmail,validatePassword,validateUsername } = require('../utils/validators');
const SALT_ROUNDS = 10;

// Create Schema
const UserSchema = new Schema({
    username: {
        type: String, 
        required: 'Username is required',
        unique: true,
        min: [4, 'Username must be at least 3 characters long, got {VALUE}'],
        max: [20, 'Username must be less than 20 characters long, got {VALUE}'],
        validate: [validateUsername, 'Please fill a valid username, should be at least 3 characters and contain only letters or numbers with no space between, got {VALUE}'],
    },
    email: {
        type: String,
        required: 'Email is required',
        unique: 'Email already exists',
        lowercase: true,
        validate: [validateEmail, 'Please fill a valid email address should look like (youremail@domain.com)'],
    },
    password: {
        type: String,
        required: 'Password is required',
        min: [8, 'Password must be at least 8 characters long, got {VALUE}'],
        max: [20, 'Password must be less than 20 characters long, got {VALUE}'],
        validate: [validatePassword, 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character of @$!%*?&, got {VALUE}'],
    },
    date: {
        type: Date,
        default: Date.now
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }],
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }]
});
UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    next();
  });

module.exports = User = mongoose.model('User', UserSchema);
