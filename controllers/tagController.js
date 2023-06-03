const Tag = require('../models/Tag');

exports.getAllTags =  async (req, res, next) => {
    try {
        // Get all tags
        const tags = await Tag.find().populate('projects').populate('users');
        // Send the data
        res.sendData(tags);
    } catch (err) {
        next(err); // Pass the error to Express
    }
}

 exports.createTag = async (req, res, next) => {
    const tag = new Tag(req.body);
    try {
        await tag.save();
        // Send the data
        res.sendData(tag, 'Tag created successfully!', 201);
    } catch (err) {
        next(err); // Pass the error to Express
    }
}

 exports.getTagById = async (req, res, next) => {
    try {
        const tag = await Tag.findById(req.params.id);
        // Send the data
        res.sendData(tag);
    } catch (err) {
        next(err); // Pass the error to Express
    }
}

exports.updateTagById = async (req, res, next) => {
    try {
        const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        let message;
        if (tag.length === 0) message = 'No tags updated!';
        else message = 'Tag updated successfully!';
        // Send the data
        res.sendData(tag, message);
    } catch (err) {
        next(err); // Pass the error to Express
    }
}

exports.deleteTagById = async (req, res, next) => {
    try { 
        const tag = await Tag.findByIdAndDelete(req.params.id);
        

        let message;
        if (tag?.length === 0) message = 'No tags deleted!';
        else message = 'Tag deleted successfully!';
        // Send the data
        res.sendData(tag, message);
    } catch (err) {
        next(err); // Pass the error to Express
    }
}