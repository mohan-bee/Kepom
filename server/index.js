require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./config/db');
require('./config/passport');

const authRoute = require('./routes/auth.route');
const musicRoute = require('./routes/music.route');
const playlistRoute = require('./routes/playlist.route');

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connectDB();

// CORS Middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" }
}));

app.use(passport.initialize());
app.use(passport.session());

// Debug Middleware
app.use((req, res, next) => {
    console.log("Session:", req.session);
    console.log("User:", req.user);
    next();
});

// Routes
app.use('/auth', authRoute);
app.use('/api/music', musicRoute);
app.use('/api/playlist', playlistRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
