const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo'); // ✅ Use MongoDB session store
require('dotenv').config();
require('./config/passport');

const authRoute = require('./routes/auth.route');
const musicRoute = require('./routes/music.route');
const playlistRoute = require('./routes/playlist.route');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 8080;

// ✅ CORS Configuration
app.use(cors({
    origin: process.env.CLIENT_URL, // ✅ Must be the frontend URL
    methods: "GET, POST, PUT, DELETE, PATCH",
    credentials: true // ✅ Must allow credentials
}));

app.use(express.json());

// ✅ Session Middleware (Must be before Passport)
app.use(session({
    secret: process.env.SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }), // ✅ Store sessions in MongoDB
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        secure: process.env.NODE_ENV === "production", // ✅ Secure cookies in production (HTTPS required)
        httpOnly: true,
        sameSite: 'none'  // ✅ Required for cross-site cookies
    }
}));

// ✅ Passport Middleware (After Session)
app.use(passport.initialize());
app.use(passport.session()); 

// ✅ Routes
app.use('/auth', authRoute);
app.use('/api/music', musicRoute);
app.use('/api/playlist', playlistRoute);

// ✅ Connect to Database & Start Server
app.listen(PORT, async () => {
    try {
        await connectDB();
        console.log(`Server is Running at ${PORT}`);
    } catch (error) {
        console.error("Database connection error:", error.message);
    }
});
