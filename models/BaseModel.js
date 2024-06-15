const fs = require('fs');
const path = require('path');

class BaseModel {
  constructor(filePath, schema) {
    this.filePath = path.join(__dirname, '..', 'data', filePath);
    this.schema = schema;
    this.data = this.readData();
  }

  readData() {
    const data = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  writeData() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
  }

  validateSchema(object) {
    const keys = Object.keys(this.schema);
    for (let key of keys) {
      if (!object.hasOwnProperty(key) || typeof object[key] !== this.schema[key]) {
        return false;
      }
    }
    return true;
  }

  getAll() {
    return this.data;
  }

  getById(id) {
    return this.data.find(item => item.id === id);
  }

  create(item) {
    if (!this.validateSchema(item)) {
      throw new Error('Invalid schema');
    }
    const newItem = { id: Date.now().toString(16), ...item };
    this.data.push(newItem);
    this.writeData();
    return newItem;
  }

  update(id, updatedItem) {
    const index = this.data.findIndex(item => item.id === id);
    if (index !== -1) {
      if (!this.validateSchema(updatedItem)) {
        throw new Error('Invalid schema');
      }
      this.data[index] = { id, ...updatedItem };
      this.writeData();
      return this.data[index];
    }
    return null;
  }

  delete(id) {
    const index = this.data.findIndex(item => item.id === id);
    if (index !== -1) {
      const [deletedItem] = this.data.splice(index, 1);
      this.writeData();
      return deletedItem;
    }
    return null;
  }
}

module.exports = BaseModel;
