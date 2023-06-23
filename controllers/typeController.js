const Type = require('../models/Type');

exports.getAllTypes =  async (req, res, next) => {
    try {
        // Get all types
        const types = await Type.find().populate('projects').populate('users');
        // Send the data
        res.sendData(types);
    } catch (err) {
        next(err); // Pass the error to Express
    }
}

 exports.createType = async (req, res, next) => {
     console.log(req.body);
    const type = new Type(req.body);
    try {
        await type.save();
        // Send the data
        res.sendData(type, 'type created successfully!', 200);
    } catch (err) {
        next(err); // Pass the error to Express
    }
}

 exports.getTypeById = async (req, res, next) => {
    try {
        const type = await Type.findById(req.params.id);
        // Send the data
        res.sendData(type);
    } catch (err) {
        next(err); // Pass the error to Express
    }
}

exports.updateTypeById = async (req, res, next) => {
    try {
        const type = await Type.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        let message;
        if (Type.length === 0) message = 'No types updated!';
        else message = 'type updated successfully!';
        // Send the data
        res.sendData(type, message);
    } catch (err) {
        next(err); // Pass the error to Express
    }
}

exports.deleteTypeById = async (req, res, next) => {
    try { 
        const type = await Type.findByIdAndDelete(req.params.id);
        

        let message;
        if (type?.length === 0) message = 'No types deleted!';
        else message = 'type deleted successfully!';
        // Send the data
        res.sendData(type, message);
    } catch (err) {
        next(err); // Pass the error to Express
    }
}