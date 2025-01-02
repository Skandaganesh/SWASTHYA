//server.js
const express = require('express');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');
const mealPlanRoutes = require('./routes/mealPlanRoutes');
const authRoutes = require('./routes/authRoutes');
const mysql = require('mysql2');

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

app.use('/api/meal-plans', mealPlanRoutes);
// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// const express= require('express');
// const cors= require('cors');
// const dotenv= require('dotenv');
// const authRoutes= require('./routes/authRoutes'); 
// const mealPlanRoutes= require('./routes/mealPlanRoutes'); 
// const ingredientRoutes= require('./routes/ingredientRoutes'); 
// const recipeRoutes= require('./routes/recipeRoutes'); 
// const allergyRoutes= require('./routes/allergyRoutes'); 
// const healthMetricRoutes= require('./routes/healthMetricRoutes'); 
// const nutritionTipRoutes= require('./routes/nutritionTipRoutes'); 

// dotenv.config();
// const app= express();

// app.use(cors());
// app.use(express.json());

// app.use('/api/auth', authRoutes); 
// app.use('/api/meal-plans', mealPlanRoutes); 
// app.use('/api/ingredients', ingredientRoutes); 
// app.use('/api/recipes', recipeRoutes); 
// app.use('/api/allergies', allergyRoutes); 
// app.use('/api/health-metrics', healthMetricRoutes); 
// app.use('/api/nutrition-tips', nutritionTipRoutes); 

// const PORT= process.env.PORT || 5001;
// app.listen(PORT , () => console.log(`Server running on port ${PORT}`));

