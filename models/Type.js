const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { validateName, validateSlug } = require("../utils/validators");

// create type Schema
const TypeSchema = new Schema({
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
    technologies: [{
        type: Schema.Types.ObjectId,
        ref: 'Technology'
    }],


})

// if there is not slug inserted by user , create a slug from the name of the tag before saving it to the database if the name contain spaces replace them with dashes and make it lowercase
TypeSchema.pre('validate', function (next) {
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

// create type model
const Type = mongoose.model('Type', TypeSchema);

module.exports = Type;
