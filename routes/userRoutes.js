const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isauthenticated = require("../middleware/authenticate");

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 */
router.get('/', async (req, res, next) => {
  try {
    await userController.getAllUsers(req, res);
  } catch (error) {
    if (!error.status) error.status = 500;
    if (error.status === 500) error.message = "Failed to fetch users";
    next(error);
  }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a single user
 *     tags: [Users]
 */
router.get('/:id', async (req, res, next) => {
  try {
    await userController.getSingleUser(req, res);
  } catch (error) {
    if (!error.status) error.status = 500;
    if (error.status === 500) error.message = "Failed to fetch user";
    next(error);
  }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Add a new user
 *     tags: [Users]
 */
router.post('/', isauthenticated, async (req, res, next) => {
  try {
    await userController.addUser(req, res);
  } catch (error) {
    if (!error.status) error.status = 500;
    if (error.status === 500) error.message = "Failed to create user";
    next(error);
  }
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 */
router.put('/:id', isauthenticated, async (req, res, next) => {
  try {
    await userController.updateUser(req, res);
  } catch (error) {
    if (!error.status) error.status = 500;
    if (error.status === 500) error.message = "Failed to update user";
    next(error);
  }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 */
router.delete('/:id', isauthenticated, async (req, res, next) => {
  try {
    await userController.deleteUser(req, res);
  } catch (error) {
    if (!error.status) error.status = 500;
    if (error.status === 500) error.message = "Failed to delete user";
    next(error);
  }
});

module.exports = router;
