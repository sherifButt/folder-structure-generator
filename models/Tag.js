// create Tags schema for mongoose
const mongoose = require('mongoose');
const { validateTag, validateTagSlug } = require('../utils/validators');

const TagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Tag name is required',
        unique: 'Tag name already exists',
        minlength: [3, 'Tag name must be at least 3 characters long'],
        maxlength: [20, 'Tag name must be less than 20 characters long'],
        validate: [validateTag, 'Please fill a valid tag name, must contain only letters or numbers, got {VALUE}']
    },
    slug: {
        type: String,
        required: 'Tag slug is required',
        unique: 'Tag slug already exists',
        minlength: [3, 'Tag slug must be at least 3 characters long'],
        maxlength: [20, 'Tag slug must be less than 20 characters long'],
        validate: [validateTagSlug, 'Please fill a valid tag name, must contain only letters or numbers, got {VALUE}']
    },
    description: {
        type: String,
        required: 'Tag description is required',
    },
    date: {
        type: Date,
        default: Date.now
    },
    projects:[{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Project'
        }],
    users: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        }]
});

// if there is not slug inserted by user , create a slug from the name of the tag before saving it to the database if the name contain spaces replace them with dashes and make it lowercase
TagSchema.pre('validate', function (next) {
    if (!this.slug) {
        let slug
        // remove any ting that is not a letter or a number or a space
        slug = this.name.replace(/[^a-zA-Z0-9 ]/g, "");
        // trim the name 
        slug = slug.trim();
        slug = slug.toLowerCase().split(' ').join('-');
        // only keep one dash between words
        this.slug = slug.replace(/-+/g, '-'); 
    }
    next();
});



module.exports = Tag = mongoose.model('Tag', TagSchema);