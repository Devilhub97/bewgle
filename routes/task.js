const express = require('express');
const router = express.Router();

const taskController = require('../controllers/task.controller');

router.all('/process', taskController.process);
router.post('/stats', taskController.statistics);

module.exports = router;