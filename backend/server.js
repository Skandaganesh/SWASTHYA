//server.js
const express = require('express');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();

// Initialize express app
const app = express();

// CORS configuration


const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed custom headers
  credentials: true, // Allow credentials (cookies, etc.)
};
app.options('*', cors(corsOptions)); // Handle preflight requests

app.use(cors(corsOptions));

// Use session middleware (after app initialization)
// app.use(session({
//   secret: '1d2f3244ed89f4688610ca31d6bf77ab0f112e19f83c9b18faa83f091a30c1bd64c617fdf537ceb84dd775d8d8912ffaf7b65a38119c143df674d77b586ee285',    // Secret key for signing session ID cookie
//   resave: false,
//   saveUninitialized: true,
//   cookie: { 
//     secure: false,  // Set to true in production (with HTTPS)
//     httpOnly: true, // Ensures cookie is not accessible via JavaScript
//     sameSite: 'strict' // Prevents CSRF attacks
//   }
// }));

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mysql = require('mysql2');
const authRoutes = require('./routes/authRoutes');

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // replace with your DB username
  password: 'Sgpv@0402',  // replace with your DB password
  database: 'swasthya'  // replace with your DB name
});

// Test database connection
db.connect((err) => {
  if (err) {
    console.error('Could not connect to the database:', err);
    process.exit();
  } else {
    console.log('Connected to the database!');
  }
});

// Middleware to attach db to request object
app.use('/api', (req, res, next) => {
  req.db = db;
  next();
});

// Use authentication routes
app.use('/api/auth', authRoutes);
app.use('/api/mealPlans', mealPlanRoutes);
// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
