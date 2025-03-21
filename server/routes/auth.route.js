const router = require('express').Router()
const passport = require('passport')


router.get('/login/success', (req,res) => {
    console.log(req.user)
    if(req.user){
        return res.status(200).json({msg: "Login Success", user: req.user})
    }
})

router.get('/login/failed', (req,res) => {
    return res.status(401).send("Login Failed")
})
router.get("/google/callback", (req, res, next) => {
    console.log("Google Callback Reached");
    next();
}, passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: '/login/failed'
}));

router.get('/login/success', (req, res) => {
    console.log("Login Success Route Hit, User:", req.user);
    if (req.user) {
        return res.status(200).json({ msg: "Login Success", user: req.user });
    } else {
        return res.status(401).json({ msg: "User Not Authenticated" });
    }
});


router.get('/google', passport.authenticate('google', ["profile", "email"]))

router.get('/logout', (req, res, next) => {
    req.logout(function(err) {  // Ensure logout callback is handled
        if (err) {
            return next(err);
        }
        req.session.destroy((err) => {  // Destroy session properly
            if (err) {
                return res.status(500).json({ message: "Logout failed" });
            }
            res.clearCookie('connect.sid');  // Clear session cookie (important)
            res.redirect(process.env.CLIENT_URL);  // Redirect to frontend
        });
    });
});


module.exports = router