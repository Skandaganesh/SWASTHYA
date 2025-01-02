const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

// Route to authenticate admin
router.post('/login', adminController.adminLogin);

// Routes for managing users
router.post('/users', adminController.addUser);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);
router.get('/users', adminController.fetchUsers);

// Routes for managing meals
router.post('/meals', adminController.addMeal);
router.get('/meals', adminController.fetchMeals);
// Add similar routes for ingredients and allergies...

module.exports = router;
