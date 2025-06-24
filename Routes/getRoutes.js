const express = require('express');
const router = express.Router();
const getController = require('../Controllers/getController');

router.get('/', getController.getAllTasks);
router.get('/:date', getController.getTasksByDate);

module.exports = router;