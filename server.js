const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/Task');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200' // อนุญาตการร้องขอจาก Angular
}));

// เชื่อมต่อ MongoDB
mongoose.connect('mongodb://localhost:27017/calendar', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  console.log('Database name:', mongoose.connection.name); // Debug database name
}).catch(err => {
  console.error('Connection error:', err);
});

// Event listener for connection status
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to:', mongoose.connection.name);
});
mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// API Routes
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find(); // ดึงจาก collection 'task'
    console.log('Tasks from DB:', tasks); // Debug: ดูข้อมูลที่ดึงมา
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

app.get('/tasks/:date', async (req, res) => {
  try {
    const tasks = await Task.find({ date: new Date(req.params.date) });
    console.log(`Tasks for date ${req.params.date}:`, tasks); // Debug
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks by date:', error);
    res.status(500).json({ error: 'Failed to fetch tasks by date' });
  }
});

app.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    console.log('Task added:', task); // Debug
    res.json(task);
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ error: 'Failed to add task' });
  }
});

app.put('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log('Task updated:', task); // Debug
    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    console.log('Task deleted, ID:', req.params.id); // Debug
    res.json({ message: 'Task deleted' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; // Export for testing if needed