// create Dependencies schema for mongoose
const mongoose = require('mongoose');
const { validateDependence, validateDependenceSlug } = require('../utils/validators');

const DependenceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Dependence name is required',
        unique: 'Dependence name already exists',
        minlength: [3, 'Dependence name must be at least 3 characters long'],
        maxlength: [20, 'Dependence name must be less than 20 characters long'],
        validate: [validateDependence, 'Please fill a valid dependence name, must contain only letters or numbers']
    },
    slug: {
        type: String,
        required: 'Dependence slug is required',
        unique: 'Dependence slug already exists',
        minlength: [3, 'Dependence slug must be at least 3 characters long'],
        maxlength: [20, 'Dependence slug must be less than 20 characters long'],
        validate: [validateDependenceSlug, 'Please fill a valid dependence name, must contain only letters or numbers']
    },
    description: {
        type: String,
        required: 'Dependence description is required',
    },
    date: {
        type: Date,
        default: Date.now
    },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
});

// if there is not slug inserted by user , create a slug from the name of the dependence before saving it to the database if the name contain spaces replace them with dashes and make it lowercase
DependenceSchema.pre('validate', function (next) {
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



module.exports = Dependence = mongoose.model('Dependence', DependenceSchema);