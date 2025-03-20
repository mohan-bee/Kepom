const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google OAuth Route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth Callback
router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect(process.env.CLIENT_URL);  // Redirect to frontend after login
    }
);

// Logout Route
router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;
