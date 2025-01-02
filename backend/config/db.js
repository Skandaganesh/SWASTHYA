require('dotenv').config();
const mysql = require('mysql2');

// Create a connection to the database using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);  // Exit the process with an error code
  } else {
    console.log('Connected to the MySQL database!');
  }
});

module.exports = db;  // Export the database connection so other files can use it
