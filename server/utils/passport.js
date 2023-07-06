var config = require("../config.js").load();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

if (config.social.google && config.social.google.clientID) {
  passport.use(
    new GoogleStrategy(config.social.google, function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    })
  );
}

if (config.social.facebook && config.social.facebook.clientID) {
  passport.use(
    new FacebookStrategy(config.social.facebook, function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    })
  );
}

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});
