const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.get('/', todoController.getTodos.bind(todoController));
router.get('/:id', todoController.getTodoById.bind(todoController));
router.post('/', todoController.createTodo.bind(todoController));
router.put('/:id', todoController.updateTodo.bind(todoController));
router.delete('/:id', todoController.deleteTodo.bind(todoController));

module.exports = router;

