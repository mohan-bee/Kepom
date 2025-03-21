const GoogleStrategy = require('passport-google-oauth20').Strategy
const passport = require('passport')

passport.use(
   new GoogleStrategy({
       clientID: process.env.GOOGLE_CLIENT_ID,
       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
       callbackURL: `https://kepom.onrender.com/auth/google/callback`,
      //  callbackURL: '/auth/google/callback',
       scope: ["profile", "email"]
   },
   function (accessToken, refreshToken, profile, callback){
      console.log("Google Profile", profile)
      return callback(null, profile);
  }
   )
)


passport.serializeUser((user, done) => {
   done(null, user.id);  // ✅ Store only user ID
});

passport.deserializeUser((id, done) => {
   // Simulate fetching user from database if needed
   done(null, { id });  // ✅ Retrieve user object
});

module.exports = passport