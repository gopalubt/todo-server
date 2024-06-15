
const TodoModel = require('../models/TodoModel');
const todoModel = new TodoModel();

class TodoController {
  getTodos(req, res) {
    res.json(todoModel.getAll());
  }

  getTodoById(req, res) {
    const todo = todoModel.getById(req.params.id);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  }

  createTodo(req, res) {
    try {
      const newTodo = todoModel.create(req.body);
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  updateTodo(req, res) {
    try {
      const updatedTodo = todoModel.update(req.params.id, req.body);
      if (updatedTodo) {
        res.json(updatedTodo);
      } else {
        res.status(404).json({ message: 'Todo not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  deleteTodo(req, res) {
    const deletedTodo = todoModel.delete(req.params.id);
    if (deletedTodo) {
      res.json(deletedTodo);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  }
}

module.exports = new TodoController();
