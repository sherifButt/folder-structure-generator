const mongoose = require('mongoose')
const convertNameToSlug = require('../utils/convertNameToSlug')

const DirectorySchema = new mongoose.Schema({
   originalname: {
      type: String,
      minlength: [3, 'Directory name must be at least 3 characters long'],
   },
   slug: {
      type: String,

      minlength: [3, 'Directory slug must be at least 3 characters long'],
   },
   encoding: {
      type: String
   },
   mimetype: {
      type: String
   },
   destination: {
      type: String,
      required: 'Directory destination is required',
   },
   filename: {
      type: String,
      required: 'Directory filename is required',
   },
   path: {
      type: String,
      required: 'Directory path is required',
   },
   size: {
      type: Number
   },
   description: {
      type: String,
      required: 'Directory description is required',
   },
   date: {
      type: Date,
      default: Date.now,
   },
    snippet: { 
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
   uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
   },
   projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
   Files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
   Directories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Directory' }],
})

DirectorySchema.pre('save', function (next) {
   if (!this.slug) {
        this.slug = convertNameToSlug(this.originalname)
      
   }
   next()
})

module.exports = mongoose.model('Directory', DirectorySchema)
