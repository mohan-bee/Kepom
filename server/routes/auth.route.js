const router = require('express').Router()
const passport = require('passport')

router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  
  router.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
      // Successful authentication, redirect to the frontend
      res.redirect(`${process.env.CLIENT_URL}`);
    }
  );
  
  router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(`${process.env.CLIENT_URL}`);
  });
  
  router.get("/api/user", (req, res) => {
    if (req.user) {
      res.json(req.user);
    } else {
      res.status(401).json({ message: "Not authenticated" });
    }
  });

module.exports = router