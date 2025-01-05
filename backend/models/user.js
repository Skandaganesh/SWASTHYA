// backend/models/User.js
const db = require('../config/db');

class User {
    static async create(userData) {
        const query = 'INSERT INTO Users (name, age, dietary_preferences, health_goals, allergy_info, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const values = [
            userData.name,
            userData.age,
            userData.dietary_preferences,
            userData.health_goals,
            userData.allergy_info,
            userData.email,
            userData.password
        ];

        try {
            const result = await db.query(query, values);
            return result.rows[0]; // Return the newly created user
        } catch (error) {
            console.error('Error inserting user:', error);
            throw error; // Re-throw error for handling in controller
        }
    }

    static async findById(userId) {
        const query = 'SELECT * FROM Users WHERE user_id = $1';

        try {
            const result = await db.query(query, [userId]);
            return result.rows; // Return rows from the result
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            throw error; // Re-throw error for handling in controller
        }
    }

    static async findByEmail(email) {
        const query = 'SELECT * FROM Users WHERE email = $1';

        try {
            const result = await db.query(query, [email]);
            return result.rows; // Return rows from the result
        } catch (error) {
            console.error('Error fetching user by email:', error);
            throw error; // Re-throw error for handling in controller
        }
    }

    static async findAll() {
        const query = 'SELECT * FROM Users';

        try {
            const result = await db.query(query);
            return result.rows; // Return all user records
        } catch (error) {
            console.error('Error fetching all users:', error);
            throw error; // Re-throw error for handling in controller
        }
    }
}

module.exports = User;
