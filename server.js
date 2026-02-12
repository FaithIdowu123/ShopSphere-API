// src/server.js
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3000;

app.use('/orders', require('./routes/orderRoutes'));


connectDB()
  .then(() => {
    console.log("MongoDB connected, starting server...");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });
