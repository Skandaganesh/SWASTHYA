// backend/models/adminMealPlan.js
const db = require('../config/db'); // Ensure this points to your database configuration
const MealPlan = require('./MealPlan'); // Import the existing MealPlan model

class AdminMealPlan {
    static async create(mealPlanData) {
        const { userId, startDate, endDate, goalType, totalCalories } = mealPlanData;

        const result = await db.query(
            'INSERT INTO Meal_Plans (user_id, start_date, end_date, goal_type, total_calories) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [userId, startDate, endDate, goalType, totalCalories]
        );
        return result.rows[0]; // Return the created meal plan
    }

    static async update(planId, mealPlanData) {
        const { goalType, totalCalories } = mealPlanData;

        const result = await db.query(
            'UPDATE Meal_Plans SET goal_type = $1, total_calories = $2 WHERE plan_id = $3 RETURNING *',
            [goalType, totalCalories, planId]
        );
        return result.rows[0]; // Return updated meal plan
    }

    static async delete(planId) {
        const result = await db.query('DELETE FROM Meal_Plans WHERE plan_id = $1 RETURNING *', [planId]);
        return result.rows[0]; // Return deleted meal plan
    }

    static async findAll() {
        const result = await db.query('SELECT * FROM Meal_Plans');
        return result.rows; // Return the rows from the query
    }
}

module.exports = AdminMealPlan;
