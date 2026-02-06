const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController');

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  userController.getAllUsers
);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a single user
 *     tags: [Users]
 */
router.get('/:id', userController.getSingleUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  userController.updateUser
);

module.exports = router;
