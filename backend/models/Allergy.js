const db = require('../config/db'); // Using the shared connection

// Example function to get allergies by user
module.exports = {
  getAllergiesByUser: async (userId) => {
    try {
      const [rows] = await db.promise().query('SELECT * FROM Allergies WHERE user_id = ?', [userId]);
      return rows;
    } catch (err) {
      console.error('Error fetching allergies:', err);
      throw err;
    }
  },
};
