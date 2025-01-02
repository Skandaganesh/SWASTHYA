const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST, // MySQL Workbench host, typically localhost
    user: process.env.DB_USER, // Your MySQL username
    password: process.env.DB_PASS, // Your MySQL password
    database: process.env.DB_NAME, // The database name (ai_smart_nutrition)
});

module.exports = db;
