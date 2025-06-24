const Task = require('../models/Task');

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, startTime, endTime } = req.body;

    if (!title || !description || !date || !startTime || !endTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, date, startTime, endTime },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
};
module.exports = {
updateTask
};