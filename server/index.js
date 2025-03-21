const express = require('express')
const app = express()
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
require('dotenv').config()
require('./config/passport')

const authRoute = require('./routes/auth.route')
const musicRoute = require('./routes/music.route')
const playlistRoute = require('./routes/playlist.route')
const connectDB = require('./config/db')

const PORT = process.env.PORT

app.use(express.json())
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 7 * 24 * 60 * 60 * 1000, 
        secure: process.env.NODE_ENV === "production", // ✅ Only secure in production
        httpOnly: true, 
        sameSite: 'none' 
    }
}));

app.use(passport.initialize());  // ✅ Initialize Passport
app.use(passport.session());     // ✅ Restore session

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: "GET, POST , PUT, DELETE, PATCH",
    credentials: true // ✅ Allow credentials (cookies)
}));

app.use('/auth', authRoute)
app.use('/api/music', musicRoute)
app.use('/api/playlist', playlistRoute)

app.listen(PORT, () => {
    try {
        connectDB()
        console.log(`Server is Running at ${PORT}`)
    } catch (error) {
        console.log(error.message)
    }
})