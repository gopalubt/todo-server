const { readTodos, writeTodos } = require('../models/todoModel');

const getTodos = (req, res) => {
  const todos = readTodos();
  res.json(todos);
};

const getTodoById = (req, res) => {
  const todos = readTodos();
  const todo = todos.find(t => t.id === req.params.id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
};

const createTodo = (req, res) => {
  const todos = readTodos();
  const newTodo = { id: Date.now().toString(16), ...req.body };
  todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
};

const updateTodo = (req, res) => {
  const todos = readTodos();
  const index = todos.findIndex(t => t.id === req.params.id);
  if (index !== -1) {
    todos[index] = { id: req.params.id, ...req.body };
    writeTodos(todos);
    res.json(todos[index]);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
};

const deleteTodo = (req, res) => {
  const todos = readTodos();
  const index = todos.findIndex(t => t.id === req.params.id);
  if (index !== -1) {
    const deletedTodo = todos.splice(index, 1);
    writeTodos(todos);
    res.json(deletedTodo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
};

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
};
