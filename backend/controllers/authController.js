const User = require('../models/user');

// Signup controller
exports.signup = async (req, res) => {
    const { email, name, age, dietary_preferences, health_goals, allergy_info, password } = req.body;

    if (!email || !name || !password) {
        return res.status(400).json({ message: 'Email, Name, and Password are required.' });
    }

    try {
        // Check if user exists
        const existingUser = await User.getByEmail(email);  // Use email to check user existence
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists!' });
        }

        // Save new user to database (without hashing)
        await User.create({
            email,  // Save email instead of user_id
            name,
            age,
            dietary_preferences,
            health_goals,
            allergy_info,
            password // Storing password in plain text (use hashing in production)
        });

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.getAll(); // Assuming User.getAll() fetches users
        res.status(200).json(users);  // Send the users list as JSON response
    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).json({ message: 'Error fetching users, please try again later.' });
    }
};

// Login controller
// Login controller
exports.login = async (req, res) => {
    const { email, password } = req.body;  // Use email instead of user_id

    try {
        // Check if user exists
        const user = await User.getByEmail(email);  // Get user by email
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if the password matches (password is stored in plain text)
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        
        // Ensure session is initialized
        // if (!req.session) {
        //     console.error("Session not initialized");
        //     return res.status(500).json({ message: "Session error" });
        // }
        res.status(200).json({
            message: 'Login successful',
            user: {
                email: user.email,
                name: user.name}})
        // // Store user information in session
        // req.session.user_id = user.email;  // Store email in session instead of user_id
        // req.session.name = user.name;

        // console.log("Session initialized:", req.session); // Debugging session data

        
    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
};


// Logout controller
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to logout, please try again.' });
        }

        // Add a signal for the frontend to clear local storage
        res.status(200).json({ message: 'Logout successful. Please clear local storage.' });
    });
};

