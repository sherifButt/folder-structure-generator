const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { validateName, validateSlug } = require("../utils/validators");
const convertNameToSlug = require('../utils/convertNameToSlug');

// create type Schema
const TypeSchema = new Schema({
    name: {
        type: String,
        required: [true,'Type name is required'],
        unique: [true,'Type name already exists'],
        validation: [validateName, 'Please fill a valid name, got {VALUE}, name should be at least 3 characters long and contain only letters or numbers'],

    },
    slug: {
        type: String,
        required: [true,'Type slug is required'],
        unique: [true,'Type slug already exists'],
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
        this.slug = convertNameToSlug(this.name);
    }
    next();
});

// create type model
const Type = mongoose.model('Type', TypeSchema);

module.exports = Type;
