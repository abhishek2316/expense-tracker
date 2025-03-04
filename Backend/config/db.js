const mysql = require('mysql2/promise');
require('dotenv').config();

const connectDB = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE_NAME
        });
        console.log(`Connected to database: ${process.env.DATABASE_NAME}`)
        return connection;
    } catch (err) {
        console.error('Database connection error:', err.message);
        throw err;
    }
};

module.exports = connectDB;
