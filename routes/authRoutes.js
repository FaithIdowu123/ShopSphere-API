const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const authController = require("../controllers/authController");
const isauthenticated = require("../middleware/authenticate");

router.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/callback',
  passport.authenticate('google', { failureRedirect: '/auth/login' }),
  (req, res) => {
    res.redirect('/'); 
  }
);

router.get("/logout", isauthenticated, (req, res, next) => {
    try {
        authController.logout(req, res);
    } catch (error) {
        if (!error.status) error.status = 500;
        next(error);
    }
});


module.exports = router;