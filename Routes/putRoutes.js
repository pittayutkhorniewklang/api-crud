const express = require('express');
const router = express.Router();
const putController = require('../Controllers/putController');

router.put('/:id', putController.updateTask);

module.exports = router;