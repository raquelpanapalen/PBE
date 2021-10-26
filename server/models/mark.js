const mongoose = require('mongoose')

const markSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
    unique: true
  },
  mark: {
    type: Number
  },
  name: {
    type: String
  },
  subject: {
    type: String
  }
})

module.exports = mongoose.model('Mark', markSchema)