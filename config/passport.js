const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/users');
require('dotenv').config();

// ------------------- GOOGLE OAUTH STRATEGY -------------------
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          user = await User.create({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            role: 'customer',
            oauthProvider: 'google',
            authId: profile.id
          });
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// ------------------- SERIALIZE / DESERIALIZE -------------------
passport.serializeUser((user, done) => done(null, user._id.toString()));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).select('-authId');
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
