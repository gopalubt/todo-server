const cors = require('cors');
const express = require('express');

const middlewares = {
  logger: (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  },
  corsOptions: {
    origin: '*',
    optionsSuccessStatus: 200,
  },
  errorHandler: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
  },
  middlewareRunner: (app, middlewares) => {
    middlewares.forEach((middleware) => {
      app.use(middleware);
    });
  },
};

middlewares.middlewares = [
  express.json(),
  middlewares.logger,
  cors(middlewares.corsOptions),
  // Add more middleware functions here as needed
];

module.exports = middlewares;
