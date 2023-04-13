const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: "528942054465-714orgak9s78rv912mfsm8qcborqurdp.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "https://hotspot.wifinetcom.net/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      console.log(userProfile);
      return done(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: "6015362055218031",
      clientSecret: "82530322668880a4eea01087f7d72635",
      callbackURL: "https://hotspot.wifinetcom.net/auth/facebook/callback",
      profileFields: ["id", "displayName"],
    },
    function (accessToken, refreshToken, profile, cb) {
      userProfileFacebook = profile;
      console.log(userProfileFacebook);
      return cb(null, userProfileFacebook);
    }
  )
);
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});
