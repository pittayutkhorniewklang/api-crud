const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    enum: ['Meeting', 'Learning', 'Working'],
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  }
}, { collection: 'task' }); // กำหนดชื่อ collection เป็น 'task'

module.exports = mongoose.model('Task', taskSchema);