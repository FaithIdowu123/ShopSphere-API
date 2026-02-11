const express = require("express");
const router = express.Router();
const isauthenticated = require("../middleware/authenticate");
const reviewController = require("../controllers/reviewController");

router.get('/', (req, res) => {res.send("Hi")});

module.exports = router;