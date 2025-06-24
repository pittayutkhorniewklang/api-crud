const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ error: 'No tasks found' });
    }
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks', details: error.message });
  }
};


const getTasksByDate = async (req, res) => {
  try {
    const startOfDay = new Date(req.params.date);
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(startOfDay.getDate() + 1);
    const tasks = await Task.find({
      date: { $gte: startOfDay, $lt: endOfDay }
    });
    console.log(`Tasks for date ${req.params.date}:`, tasks);
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks by date:', error);
    res.status(500).json({ error: 'Failed to fetch tasks by date' });
  }
};

module.exports = {
  getAllTasks,
  getTasksByDate
};