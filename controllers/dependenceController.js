const Dependence = require('../models/Dependence');

exports.getAllDependencies =  async (req, res, next) => {
    try {
        // Get all dependenceDependencies
        const dependenceDependencies = await Dependence.find().populate('projects');
        // Send the data
        res.data = dependenceDependencies
        res.statusCode = 201
        res.message = 'Diagram created successfully!'
        next()
        
    } catch (err) {
        next(err); // Pass the error to Express
    }
}

 exports.createDependence = async (req, res, next) => {
    const dependenceDependence = new Dependence(req.body);
    try {
        await dependenceDependence.save();
        // Send the data
        res.sendData(dependenceDependence, 'Dependence created successfully!', 201);
    } catch (err) {
        next(err); // Pass the error to Express
    }
}

 exports.getDependenceById = async (req, res, next) => {
    try {
        const dependenceDependence = await Dependence.findById(req.params.id);
        // Send the data
        res.sendData(dependenceDependence);
    } catch (err) {
        next(err); // Pass the error to Express
    }
}

exports.updateDependenceById = async (req, res, next) => {
    try {
        const dependenceDependence = await Dependence.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        let message;
        if (dependenceDependence.length === 0) message = 'No dependenceDependencies updated!';
        else message = 'Dependence updated successfully!';
        // Send the data
        res.sendData(dependenceDependence, message);
    } catch (err) {
        next(err); // Pass the error to Express
    }
}

exports.deleteDependenceById = async (req, res, next) => {
    try { 
        const dependenceDependence = await Dependence.findByIdAndDelete(req.params.id);
        let message;
        if (dependenceDependencies.length === 0) message = 'No dependenceDependencies deleted!';
        else message = 'Dependence deleted successfully!';
        // Send the data
        res.sendData(dependenceDependence, message);
    } catch (err) {
        next(err); // Pass the error to Express
    }
}