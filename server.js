const express = require('express');
const routes = require('./routes/index');
const middlewares = require('./middleware/middleware');

const app = express();
const port = 3000;

// Run the middlewares in sequence
middlewares.middlewareRunner(app, middlewares.middlewares);

// Routes
app.use('/api', routes);

// Error handling middleware
app.use(middlewares.errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
