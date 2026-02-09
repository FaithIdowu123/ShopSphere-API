const express = require('express');
const cors = require('cors');
const session = require('express-session');
const connectDB = require('./config/db');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger-output.json');
const passport = require('./config/passport'); 
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ------------------- SESSION SETUP -------------------
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret123', 
    resave: false,
    saveUninitialized: false,
  })
);


app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
  res.send("Welcom to ShopSphere API " + (req.user ? `${req.user.firstName}` : ""));;
});


app.use('/', routes); 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

connectDB()
  .then(() => {
    console.log('MongoDB connected, starting server...');
    
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

module.exports = app;
