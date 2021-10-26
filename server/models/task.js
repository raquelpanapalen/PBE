const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date
  },
  subject: {
    type: String
  },
  name: {
    type: String
  }
})

module.exports = mongoose.model('Task', taskSchema)