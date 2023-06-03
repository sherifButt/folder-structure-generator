// Require the Project model we just created
const Project = require('../models/Project');
const User = require('../models/User');

// @route  GET api/projects
// @desc   Get all projects
// @access Public
exports.createProject = async (req, res, next) => {

    const project = new Project(req.body);
    try {
        await project.save();
        // Add the project id to the user's projects array
        const user = await User.findById(req.body.user_id);
        user.projects.push(project._id);
        await user.save();

        // Send the data
        res.sendData(project, 'Project created successfully!', 201);
    } catch (err) {
        next(err); // Pass the error to Express
    }
}

// @route  GET api/projects
// @desc   Get all projects
// @access Public
exports.getAllProjects = async (req, res, next) => {
    try {
        const projects = await Project.find({}).populate('users').populate('tags').populate('dependencies');
        let message;
        if (projects.length === 0) message = 'No projects found!';
        else message = projects.length + ' Projects found successfully!';
        // Send the data
        res.sendData(projects, message);
    } catch (err) {
        next(err); // Pass the error to Express
    }
}


// @route  GET api/projects/:id
// @desc   Get a single project
// @access Public
exports.getProjectById = async (req, res, next) => {
    try {

        const project = await Project.findById(req.params.id).populate('users').populate('tags').populate('dependencies');
        
        let message;
        if (project.length === 0) message = 'No projects found!';
        else message = 'one Projects found successfully!';
        // Send the data
        res.sendData(project, message);
    } catch (err) {
        next(err); // Pass the error to Express
    }
}

// @route  PATCH api/projects/:id
// @desc   Update a single project
// @access Public
exports.updateProjectById =  async (req, res, next) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        let message;
        if (projects.length === 0) message = 'No projects updated!';
        else message = 'Projects updated successfully!';
        // Send the data
        res.sendData(project, message);
    } catch (err) {
        next(err); // Pass the error to Express
    }
}


// @route  DELETE api/projects/:id
// @desc   Delete a single project
// @access Public
exports.deleteProjectById = async (req, res, next) => {
    try { 
        const project = await Project.findByIdAndDelete(req.params.id);
        // delete the project id to the user's projects array
        // find the user that has the project id in the projects array and delete it
        const user = await User.findOne({ projects: req.params.id });
        user.projects.pull(project._id);
        await user.save();

        let message;
        if (projects.length === 0) message = 'No projects deleted!';
        else message = 'Project deleted successfully!';
        // Send the data
        res.sendData(project, message);
    } catch (err) {
        next(err); // Pass the error to Express
    }
}
