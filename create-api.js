#!/usr/bin/env node

const fs = require('fs');
const { program } = require('commander');

program
  .version('1.0.0')
  .description('Command to generate a complete API structure')
  .argument('<apiName>', 'Name of the API to create')
  .action((apiName) => {
    createApi(apiName);
  });

program.parse(process.argv);

function createApi(apiName) {
  const apiDirectory = `./${apiName}`;
  const controllersDirectory = `${apiDirectory}/controllers`;
  const modelsDirectory = `${apiDirectory}/models`;
  const routesDirectory = `${apiDirectory}/routes`;

  // Create API directory and subdirectories
  fs.mkdirSync(apiDirectory);
  fs.mkdirSync(controllersDirectory);
  fs.mkdirSync(modelsDirectory);
  fs.mkdirSync(routesDirectory);

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
