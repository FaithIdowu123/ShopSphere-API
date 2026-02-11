const express = require("express");
const router = express.Router();
const isauthenticated = require("../middleware/authenticate");
const orderController = require("../controllers/orderController");

router.get('/', (req, res) => {res.send("Hi")});

module.exports = router;