#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { program } = require('commander');

program
  .version('1.0.0')
  .description('Command to generate a complete API structure')
  .arguments('<command> <action> <type> <apiName>')
  .action((command, action, type, apiName) => {
    if (command === 'server' && action === 'create' && type === 'api' && apiName) {
      createApi(apiName);
    } else {
      console.error('Invalid command format. Use: node create-api.js server create <apiName>');
      process.exit(1);
    }
  });

program.parse(process.argv);

function createApi(apiName) {
  const apiDirectory = path.join(__dirname, apiName);
  const controllersDirectory = path.join(__dirname, 'controllers');
  const modelsDirectory = path.join(__dirname, 'models');
  const routesDirectory = path.join(__dirname, 'routes');

  // Create API directory if it doesn't exist
  if (!fs.existsSync(apiDirectory)) {
    fs.mkdirSync(apiDirectory);
  }

  // Create files in respective directories
  fs.writeFileSync(`${controllersDirectory}/${apiName}Controller.js`, generateController(apiName));
  fs.writeFileSync(`${modelsDirectory}/${apiName}Model.js`, generateModel(apiName));
  fs.writeFileSync(`${routesDirectory}/${apiName}Routes.js`, generateRoutes(apiName));

  console.log(`API '${apiName}' created successfully!`);
}

function generateController(apiName) {
  return `
const ${apiName}Controller = {
  // Define controller methods here
};

module.exports = ${apiName}Controller;
  `;
}

function generateModel(apiName) {
  return `
// Define ${apiName} model schema here
  `;
}

function generateRoutes(apiName) {
  return `
const express = require('express');
const router = express.Router();
const ${apiName}Controller = require('../controllers/${apiName}Controller');

// Define routes for ${apiName} API
router.get('/', ${apiName}Controller.getAll);
router.post('/', ${apiName}Controller.create);
router.get('/:id', ${apiName}Controller.getById);
router.put('/:id', ${apiName}Controller.update);
router.delete('/:id', ${apiName}Controller.delete);

module.exports = router;
  `;
}
