const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/login/success', (req, res) => {
    console.log("Session:", req.session); // ✅ Check if session exists
    console.log("User in req.user:", req.user); // ✅ Should not be undefined

    if (req.user) {
        res.cookie("test_cookie", "test_value", { httpOnly: true, secure: false }); // ✅ Test if cookie is set
        return res.status(200).json({ msg: "Login Success", user: req.user });
    } else {
        return res.status(401).json({ msg: "User Not Authenticated" });
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
