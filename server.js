const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const filePath = path.join(__dirname, 'data', 'todos.json');

// Middleware
app.use(bodyParser.json());

// Helper function to read the JSON file
const readTodos = () => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

// Helper function to write to the JSON file
const writeTodos = (todos) => {
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2), 'utf8');
};

// Get all todos
app.get('/api/todos', (req, res) => {
  const todos = readTodos();
  res.json(todos);
});

// Get a single todo by id
app.get('/api/todos/:id', (req, res) => {
  const todos = readTodos();
  const todo = todos.find((t) => t.id === req.params.id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// Create a new todo
app.post('/api/todos', (req, res) => {
  const todos = readTodos();
  const newTodo = {
    id: generateUniqueHexId(),
    title: req.body.title,
    desc:req.body.desc,
    status: req.body.status || 'Todo',
    created_At: new Date().toISOString()
  };
  todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
});

// Update a todo by id
app.put('/api/todos/:id', (req, res) => {
  const todos = readTodos();
  const index = todos.findIndex((t) => t.id === req.params.id);
  if (index !== -1) {
    todos[index] = {
      ...todos[index],
      title: req.body.title !== undefined ? req.body.title : todos[index].title,
      status: req.body.status !== undefined ? req.body.status : todos[index].status,
    };
    writeTodos(todos);
    res.json(todos[index]);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// Delete a todo by id
app.delete('/api/todos/:id', (req, res) => {
  const todos = readTodos();
  const index = todos.findIndex((t) => t.id === req.params.id);
  if (index !== -1) {
    const deletedTodo = todos.splice(index, 1);
    writeTodos(todos);
    res.json(deletedTodo[0]);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
const generatedIds = new Set();
const generateUniqueHexId = () => {
    let hexId;
    do {
      hexId = Math.floor(Math.random() * 0x100000000000000).toString(16).padStart(14, '0');
    } while (generatedIds.has(hexId) || !hasUniqueDigits(hexId));
    generatedIds.add(hexId);
    return hexId;
  };
// Helper function to check if a number has all unique digits
const hasUniqueDigits = (num) => {
    const digits = new Set();
    for (const digit of num) {
      if (digits.has(digit)) {
        return false;
      }
      digits.add(digit);
    }
    return true;
  };