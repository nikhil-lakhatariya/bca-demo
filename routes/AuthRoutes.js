const express = require('express');
const router = express.Router();

const { loginUser } = require('../controllers/AuthController');

router.post('/auth/login', loginUser);

module.exports = router;