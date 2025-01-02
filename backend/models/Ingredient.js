const db = require('../config/db');

module.exports = {
  // Example: Fetch ingredients by some condition
  getIngredientsByUser: async (userId) => {
    const [rows] = await connection.promise().query('SELECT * FROM Ingredients WHERE user_id = ?', [userId]);
    return rows;
  },
};
