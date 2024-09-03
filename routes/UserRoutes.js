const express = require('express');
const router = express.Router();
const { verifyToken } = require('../helpers/Validation');
const { createUser, getAllUser, getUserById, updateUser, deleteUser } = require('../controllers/UserController');

router.post('/user', createUser);
router.get('/user', getAllUser);
router.get('/user/:id', getUserById);
router.put('/user', verifyToken, updateUser);
router.delete('/user/:id', verifyToken, deleteUser);

module.exports = router;