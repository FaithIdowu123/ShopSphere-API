const express = require('express');
const mongoose = require('./config/db');
const routes = require('./routes');
/* const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json'); */
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());



// Root route
routes.get('/', (req, res) => {
  res.send('Welcome to the ShopSphere API');
});

// Swagger UI
app.use('/', routes);
/* app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); */

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose.connectDB().then(() => {
    console.log('Database connected successfully');
}).catch(err => {
  console.error('Failed to connect to database:', err);
  process.exit(1);
});

