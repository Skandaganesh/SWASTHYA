const User = require('../models/User');
const { Pool } = require('pg'); // Import the Pool for database queries

// Database connection configuration
const pool = new Pool({
  user: 'postgres', // Update with your database username
  host: 'localhost',
  database: 'nutrition_db', // Update with your database name
  password: 'Sgpv@0402', // Update with your password
  port: 5432, // Default PostgreSQL port
});

// Create a new user
exports.createUser = async (req, res) => {
    const userData = req.body;

    try {
        const result = await User.create(userData); // Use async/await for better error handling
        res.status(201).json({ message: 'User created successfully', userId: result.user_id }); // Adjusted to use user_id
    } catch (err) {
        console.error('Error creating user:', err); // Log error for debugging
        return res.status(500).json({ error: err.message });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const results = await User.findById(userId);
        if (results.length === 0) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(results[0]);
    } catch (err) {
        console.error('Error fetching user by ID:', err); // Log error for debugging
        return res.status(500).json({ error: err.message });
    }
};

// User login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const results = await User.findByEmail(email);
        
        if (!results || results.length === 0 || results[0].password !== password) { // Check if results exist and validate password
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const userId = results[0].user_id; // Get the user ID from the results
        res.status(200).json({ message: 'Login successful', userId: userId }); // Return user ID
    } catch (err) {
        console.error('Error during login:', err); // Log error for debugging
        return res.status(500).json({ error: err.message });
    }
};

// Fetch all users for admin
exports.getAllUsers = async (req, res) => {
    try {
        const results = await User.findAll();
        res.status(200).json(results); // Return the list of users
    } catch (err) {
        console.error('Error fetching all users:', err); // Log error for debugging
        return res.status(500).json({ error: err.message });
    }
};

// Get user dashboard data
exports.getUserDashboardData = async (req, res) => {
    const { userId } = req.params;
  
    try {
        const result = await pool.query(
            `SELECT 
               u.name, 
               u.age, 
               u.health_goals AS healthGoals, 
               mp.start_date AS startDate, 
               mp.end_date AS endDate, 
               mp.total_calories AS totalCalories 
             FROM Users u
             LEFT JOIN Meal_Plans mp ON u.user_id = mp.user_id
             WHERE u.user_id = $1`,
            [userId]
          
          
      );
      
      
      if (result && result.rows && result.rows.length > 0) {
        const user = result.rows[0];
        const formattedResult = {
          name: user.name,
          age: user.age,
          healthGoals: user.healthgoals,
          startDate: user.startdate,
          endDate: user.enddate,
          totalCalories: user.totalcalories
        };
        
        res.status(200).json(formattedResult);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
// Export all functions