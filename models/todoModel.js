const BaseModel = require('./BaseModel');

const TodoSchema = {
  title: 'string',
  description: 'string',
  completed: 'boolean'
};

class TodoModel extends BaseModel {
  constructor() {
    super('todos.json', TodoSchema);
  }
}

module.exports = TodoModel;
