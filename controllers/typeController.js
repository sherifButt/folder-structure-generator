const type = require('../models/Type');

exports.getAllTypes =  async (req, res, next) => {
    try {
        // Get all types
        const types = await type.find().populate('projects').populate('users');
        // Send the data
        res.sendData(types);
    } catch (err) {
        next(err); // Pass the error to Express
    }
}

 exports.createType = async (req, res, next) => {
    const type = new type(req.body);
    try {
        await type.save();
        // Send the data
        res.sendData(type, 'type created successfully!', 201);
    } catch (err) {
        next(err); // Pass the error to Express
    }
}

 exports.getTypeById = async (req, res, next) => {
    try {
        const type = await type.findById(req.params.id);
        // Send the data
        res.sendData(type);
    } catch (err) {
        next(err); // Pass the error to Express
    }
}

exports.updateTypeById = async (req, res, next) => {
    try {
        const type = await type.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        let message;
        if (type.length === 0) message = 'No types updated!';
        else message = 'type updated successfully!';
        // Send the data
        res.sendData(type, message);
    } catch (err) {
        next(err); // Pass the error to Express
    }
}

exports.deleteTypeById = async (req, res, next) => {
    try { 
        const type = await type.findByIdAndDelete(req.params.id);
        

        let message;
        if (type?.length === 0) message = 'No types deleted!';
        else message = 'type deleted successfully!';
        // Send the data
        res.sendData(type, message);
    } catch (err) {
        next(err); // Pass the error to Express
    }
}