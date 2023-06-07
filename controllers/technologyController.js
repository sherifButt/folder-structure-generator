const Technology = require('../models/Technology');

exports.getAllTechnologies =  async (req, res, next) => {
    try {
        // Get all technologies
        const technologies = await Technology.find().populate('projects');
        // Send the data
        res.sendData(technologies);
    } catch (err) {
        next(err); // Pass the error to Express
    }
}

 exports.createTechnology = async (req, res, next) => {
    const technology = new Technology(req.body);
    try {
        await technology.save();
        // Send the data
        res.sendData(technology, 'Technology created successfully!', 200);
    } catch (err) {
        next(err); // Pass the error to Express
    }
}

 exports.getTechnologyById = async (req, res, next) => {
    try {
        const technology = await Technology.findById(req.params.id);
        // Send the data
        res.sendData(technology);
    } catch (err) {
        next(err); // Pass the error to Express
    }
}

exports.updateTechnologyById = async (req, res, next) => {
    try {
        const technology = await Technology.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        let message;
        if (technology.length === 0) message = 'No technologies updated!';
        else message = 'Technology updated successfully!';
        // Send the data
        res.sendData(technology, message);
    } catch (err) {
        next(err); // Pass the error to Express
    }
}

exports.deleteTechnologyById = async (req, res, next) => {
    try { 
        const technology = await Technology.findByIdAndDelete(req.params.id);
        

        let message;
        if (technology?.length === 0) message = 'No technologies deleted!';
        else message = 'Technology deleted successfully!';
        // Send the data
        res.sendData(technology, message);
    } catch (err) {
        next(err); // Pass the error to Express
    }
}