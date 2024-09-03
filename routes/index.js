const express = require('express');
const router = express.Router();

const UserRoutes = require('./UserRoutes');
const AuthRoutes = require('./AuthRoutes');
const TaskRoutes = require('./TaskRoutes');

router.use("/api", UserRoutes, AuthRoutes, TaskRoutes);

module.exports = router;