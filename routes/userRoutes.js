const routes = require('express').Router();
const userController = require('../controllers/userController');

routes.get('/', (req, res) => {
  res.send('User routes placeholder');
});

routes.post('/', async (req, res) => {
  try {
    userController.addUser(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

routes.delete('/:id', async (req, res) => {
  try {
    userController.deleteUser(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = routes;