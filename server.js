const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger-output.json');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Allow all origins (for development)
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the ShopSphere API');
});

// Mount routes
app.use('/', routes);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Global error handler (must be after routes)
app.use(errorHandler);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    console.log('MongoDB connected, starting server...');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); // Stop the server if DB connection fails
  });
