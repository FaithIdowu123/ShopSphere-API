const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send('Product routes placeholder');
});

module.exports = routes;