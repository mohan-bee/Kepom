const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();
require("./config/passport"); // Import Passport configuration

const authRoute = require("./routes/auth.route");
const musicRoute = require("./routes/music.route");
const playlistRoute = require("./routes/playlist.route");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 8080;

// ✅ CORS Configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Frontend URL (e.g., http://localhost:3000)
    methods: "GET, POST, PUT, DELETE, PATCH", // Allowed HTTP methods
    credentials: true, // Allow cookies and sessions to be sent
  })
);

// ✅ Middleware for parsing JSON
app.use(express.json());

// ✅ Session Middleware (Must be before Passport)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecretkey", // Session secret key
    resave: false, // Don't resave sessions if not modified
    saveUninitialized: true, // Save new sessions
    cookie: {
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      maxAge: 1000 * 60 * 60 * 24, // Session duration (1 day)
    },
  })
);

// ✅ Passport Middleware (After Session)
app.use(passport.initialize()); // Initialize Passport
app.use(passport.session()); // Enable session support for Passport

// ✅ Routes
app.use("/auth", authRoute); // Authentication routes (e.g., /auth/google, /auth/logout)
app.use("/api/music", musicRoute); // Music-related routes
app.use("/api/playlist", playlistRoute); // Playlist-related routes

// ✅ Root route for testing
app.get("/", (req, res) => {
  res.send("Welcome to the Music App Backend!");
});

// ✅ Connect to Database & Start Server
app.listen(PORT, async () => {
  try {
    await connectDB(); // Connect to MongoDB
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
});