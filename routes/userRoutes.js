
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define routes for user API
router.get('/', userController.getAll);
router.post('/', userController.create);
router.get('/:id', userController.getById);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

module.exports = router;
  