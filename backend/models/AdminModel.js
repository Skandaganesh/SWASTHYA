const db = require('../config/db'); // Assuming db is already set up

// Functions to interact with the database can go here

// Example function to fetch all ingredients
const fetchIngredients = async () => {
  try {
      const [ingredients] = await db.promise().query(`SELECT * FROM Ingredients`);
      return ingredients;
  } catch (error) {
      throw new Error('Error fetching ingredients');
  }
};

// Example function to fetch all allergies
const fetchAllergies = async () => {
  try {
      const [allergies] = await db.promise().query(`SELECT * FROM Allergies`);
      return allergies;
  } catch (error) {
      throw new Error('Error fetching allergies');
  }
};

module.exports = { fetchIngredients, fetchAllergies };
