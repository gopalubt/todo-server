const express = require('express');
const router = express.Router();
const todoRoutes = require('./todoRoutes');

// Use todoRoutes
router.use('/todos', todoRoutes);

module.exports = router;
