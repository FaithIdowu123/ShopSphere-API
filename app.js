// src/app.js
const express = require("express");
const session = require('express-session');
const cors = require("cors");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger-output.json");
const passport = require('./config/passport'); 

require("dotenv").config();

const app = express();

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

// Root route
app.get('/', (req, res) => {
  res.send("Welcom to ShopSphere API " + (req.user ? `${req.user.firstName}` : ""));;
});

// Mount routes
app.use("/", routes);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Global error handler
app.use(errorHandler);

module.exports = app; // EXPORT the app
