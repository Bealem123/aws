const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const adminRoutes = require("./routes/adminRoutes"); // Add admin routes
require("./cronJobs/attendanceCron");
require("dotenv").config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow multiple origins (you can add more as needed)
    const allowedOrigins = [
      "http://localhost:3000", // Frontend URL for development
      "http://your-production-url.com", // Production URL
    ];

    // Check if the origin is allowed
    if (allowedOrigins.includes(origin) || !origin) {
      // Allow requests without an origin (e.g., Postman)
      callback(null, true);
    } else {
      // Reject requests from disallowed origins
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers, include Authorization for JWT
};

app.use(cors(corsOptions)); // Apply CORS middleware with dynamic options

// Middleware to parse JSON request bodies
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/admin", adminRoutes); // Register admin routes

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "An error occurred!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});