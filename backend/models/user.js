const db = require('../config/db');  // Database configuration

module.exports = {
  // Get user by email
  getByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  },

  // Get all users
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users', (err, results) => {
        if (err) reject(err);  // Reject if there's an error
        else resolve(results);  // Resolve with the query results
      });
    });
  },

  // Create a new user
  create: (user) => {
    const { email,  name, age, dietary_preferences, health_goals, allergy_info, password } = user;
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO users ( email,name, age, dietary_preferences, health_goals, allergy_info, password) VALUES (?, ?, ?, ?, ?, ?, ?)', 
        [email, name, age, dietary_preferences, health_goals, allergy_info, password], 
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
};
