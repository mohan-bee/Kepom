const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/login/success', (req, res) => {
    if (req.user) {
        return res.status(200).json({ 
            message: "Login successful", 
            user: req.user 
        });
    } else {
        return res.status(401).json({ message: "User Not Authenticated" });
    }
});

router.get('/login/failed', (req, res) => {
    return res.status(401).json({ message: "Login Failed" });
});

router.get("/google/callback", 
    passport.authenticate('google', {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: '/auth/login/failed'
    })
);

router.get('/google', passport.authenticate('google', { scope: ["profile", "email"] }));

router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) return res.status(500).json({ message: "Logout failed" });

        req.session.destroy(err => {
            if (err) return res.status(500).json({ message: "Logout failed" });

            res.clearCookie('connect.sid');
            res.redirect(process.env.CLIENT_URL);
        });
    });
});

module.exports = router;
