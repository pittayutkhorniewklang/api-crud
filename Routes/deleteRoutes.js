const express = require('express');
const router = express.Router();
const deleteController = require('../Controllers/deleteController');

router.delete('/:id', deleteController.deleteTask);

module.exports = router;