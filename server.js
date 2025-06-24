const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/Task');
const getRoutes = require('./Routes/getRoutes');
const postRoutes = require('./Routes/postRoutes');
const putRoutes = require('./Routes/putRoutes');
const deleteRoutes = require('./Routes/deleteRoutes');


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

app.use('/tasks', getRoutes);
app.use('/tasks', postRoutes);
app.use('/tasks', putRoutes);
app.use('/tasks', deleteRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app