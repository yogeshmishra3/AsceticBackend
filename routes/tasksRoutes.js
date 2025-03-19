const express = require('express');
const Task = require('../models/Tasks');

const router = express.Router();

// ✅ Create Task
router.post('/', async (req, res) => {
    const { subject, task, time, type } = req.body;

    if (!subject || !task || !time || !type) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newTask = new Task({ subject, task, time, type });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// ✅ Get All Tasks
router.get('/', async (req, res) => {
    try {
        const todayTasks = await Task.find({ type: 'today' });
        const tomorrowTasks = await Task.find({ type: 'tomorrow' });

        res.json({ todayTasks, tomorrowTasks });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// ✅ Delete Task
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.deleteOne();
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
