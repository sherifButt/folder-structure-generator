const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { validateName, validateSlug } = require("../utils/validators");

// create Technology Schema
const TechnologySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        validation: [validateName, 'Please fill a valid name, got {VALUE}, name should be at least 3 characters long and contain only letters or numbers'],

    },
    slug: {
        type: String,
        required: true,
        unique: true,
        validation:[validateSlug, 'Please fill a valid slug, got {VALUE}, Slug should be at least 3 characters long and contain only letters, numbers or dashes, but dashes not at the beginning or end.']
    },
    description: {
        type: String,
        max: 1000
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'Type'
    },
    projects: [{
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }],
})

// if there is not slug inserted by user , create a slug from the name of the tag before saving it to the database if the name contain spaces replace them with dashes and make it lowercase
TechnologySchema.pre('validate', function (next) {
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

// create Technology model
const Technology = mongoose.model('Technology', TechnologySchema);

module.exports = Technology;
