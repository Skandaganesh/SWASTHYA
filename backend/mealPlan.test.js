const request = require('supertest');
const app = require('./server'); // Adjust path as necessary to import your Express app

describe('Meal Plan API', () => {
  it('should suggest meal plans based on user preferences', async () => {
    const response = await request(app)
      .post('/api/meal-plans/suggest')
      .send({
        userId: 1,
        dietaryPreferences: 'vegan, gluten-free',
        healthGoal: 'weight loss'
      })
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('mealPlans');
  });

  it('should return 404 if no suitable meal plan is found', async () => {
    const response = await request(app)
      .post('/api/meal-plans/suggest')
      .send({
        userId: 1,
        dietaryPreferences: 'non-existent-preference',
        healthGoal: 'weight loss'
      })
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('No suitable meal plan found based on your preferences and allergens.');
  });
});
