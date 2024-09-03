const express = require('express');
const router = express.Router();
const { verifyToken } = require('../helpers/Validation');
const { createTask, taskStatusHandle, getAllTask, getTaskById, getTaskByUserId, updateTask, deleteTask } = require('../controllers/TaskController');

router.post('/task', verifyToken, createTask);
router.post('/task-status', verifyToken, taskStatusHandle);
router.get('/task', verifyToken, getAllTask);
router.get('/task/:id', verifyToken, getTaskById);
router.get('/task/:userId/info', verifyToken, getTaskByUserId);
router.put('/task', verifyToken, updateTask);
router.delete('/task/:id', verifyToken, deleteTask);

module.exports = router;