const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    task: { type: String, required: true },
    time: { type: String, required: true },
    type: { type: String, required: true } // 'today' or 'tomorrow'
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
