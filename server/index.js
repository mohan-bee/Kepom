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
    cookie: { secure: false, httpOnly: true }  
}));

app.use(passport.initialize())
app.use(passport.session())
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: "GET, POST , PUT, DELETE, PATCH",
    credentials: true
}))

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