const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport').Strategy;

passport.use(new GoogleStrategy({
    clientID: "528942054465-714orgak9s78rv912mfsm8qcborqurdp.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/callback"
}, function (accessToken, refreshToken, profile, done) {
    userProfile = profile;
    console.log(userProfile);
    return done(null, profile);
}));

/* passport.use(new FacebookStrategy({
  clientID: "529063895382205",
  clientSecret: "5fdf8f61faf72389318c903a2531f53d",
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
},
function(accessToken, refreshToken, profile, cb) {
  userProfileFacebook = profile;
  console.log(userProfileFacebook);
  return done(null, profile);
}
));  */
passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});
