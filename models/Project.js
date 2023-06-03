const mongoose = require('mongoose');

const { slug } = require('./Tag');


const ProjectSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: 'User id is required'
  },
  projectName: {
    type: String,
    required: 'Project name is required',
    unique: 'Project name already exists'
  },
  slug: {
    type: String,
    required: 'Project slug is required',
    unique: 'Project slug already exists'
  },
  dependencies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dependence'
  }],
  users: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  }],
  tags: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Tag'
  }],

  
  meta: {
    type: Object,
    required: 'Meta is required',
  },
  messages: {
    type: Array,
    required: 'Messages are required'
  },
  folderStructure: {
    type: Object,
    required: 'Folder structure is required'
  }
},
  //  {
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true }
  // }
);

// ProjectSchema.virtual('users', {
//   ref: 'User',
//   localField: '_id',
//   foreignField: 'projects'
// });

const MetaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Meta name is required'
  },
  description: {
    type: String,
    required: 'Meta description is required'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

ProjectSchema.pre('save', next => {
  if (!this.slug) {
    this.slug = this.projectName.replace(/\s+/g, '-').toLowerCase();
  }
  next();
});

const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;
