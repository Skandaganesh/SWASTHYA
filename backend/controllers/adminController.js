const db = require('../config/db'); // Assuming db is already set up

const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "admin123"; // Preset password

// Admin login function
const adminLogin = (req, res) => {
    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        return res.status(200).json({ message: 'Admin logged in successfully!' });
    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
};

// Add user function
const addUser = async (req, res) => {
    const { name, age, dietary_preferences, health_goals, allergy_info, email, password } = req.body;
    try {
        const [result] = await db.promise().query(`
            INSERT INTO Users (name, age, dietary_preferences, health_goals, allergy_info, email, password) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`, [name, age, dietary_preferences, health_goals, allergy_info, email, password]);
        
        res.status(201).json({ message: 'User added successfully!', userId: result.insertId });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Server error while adding user.' });
    }
};

// Update user function
const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { name, age, dietary_preferences, health_goals } = req.body;
    
    try {
        await db.promise().query(`
            UPDATE Users 
            SET name = ?, age = ?, dietary_preferences = ?, health_goals = ? 
            WHERE user_id = ?`, [name, age, dietary_preferences, health_goals, userId]);
        
        res.status(200).json({ message: 'User updated successfully!' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Server error while updating user.' });
    }
};

// Delete user function
const deleteUser = async (req, res) => {
    const userId = req.params.id;
    
    try {
        await db.promise().query(`DELETE FROM Users WHERE user_id = ?`, [userId]);
        res.status(200).json({ message: 'User deleted successfully!' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server error while deleting user.' });
    }
};

// Fetch all users function
const fetchUsers = async (req, res) => {
    try {
        const [users] = await db.promise().query(`SELECT * FROM Users`);
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error while fetching users.' });
    }
};

// Similar functions can be created for managing meals
// Add meal function
const addMeal = async (req, res) => {
    const { name, cuisine_type, prep_time, cooking_time, difficulty_level } = req.body;
    try {
        const [result] = await db.promise().query(`
            INSERT INTO Recipes (name, cuisine_type, prep_time, cooking_time, difficulty_level) 
            VALUES (?, ?, ?, ?, ?)`, [name, cuisine_type, prep_time, cooking_time, difficulty_level]);
        
        res.status(201).json({ message: 'Meal added successfully!', mealId: result.insertId });
    } catch (error) {
        console.error('Error adding meal:', error);
        res.status(500).json({ message: 'Server error while adding meal.' });
    }
};

// Fetch all meals function
const fetchMeals = async (req, res) => {
    try {
        const [meals] = await db.promise().query(`SELECT * FROM Recipes`);
        res.status(200).json(meals);
    } catch (error) {
        console.error('Error fetching meals:', error);
        res.status(500).json({ message: 'Server error while fetching meals.' });
    }
};

// Similar functions can be created for ingredients and allergies...

module.exports = {
    adminLogin,
    addUser,
    updateUser,
    deleteUser,
    fetchUsers,
    addMeal,
    fetchMeals,
};
