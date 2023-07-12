const mongoose = require('mongoose')
const convertNameToSlug = require('../utils/convertNameToSlug')

const FileSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   slug: {
      type: String,
      required: true,
   },
   mimeType: {
      type: String,
      required: true,
   },
   size: {
      type: Number,
      required: true,
   },
   buffer: {
      type: Buffer,
      required: true,
   },
   date: {
      type: Date,
      default: Date.now,
   },
})

FileSchema.pre('save', function (next) {
   if (!this.slug) {
      this.slug = convertNameToSlug(this.name)
   }
   next()
})

module.exports = mongoose.model('File', FileSchema)
