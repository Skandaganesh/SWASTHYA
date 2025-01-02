const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes'); // Ensure path to authRoutes.js is correct
const mealPlanRoutes = require('./routes/mealPlanRoutes'); // Add the correct path to the mealPlanRoutes.js


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Use authentication routes
app.use('/api/auth', authRoutes);

app.use('/api/suggest', mealPlanRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
