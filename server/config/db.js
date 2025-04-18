const mysql = require('mysql2/promise');
require('dotenv').config();

const connectDb = async () => {
    try {
        const pool = mysql.createPool({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
        });
        console.log(`Database connected ${process.env.DATABASE}`);
        return pool;
    } catch (error) {
        console.error("Error connecting to database:", error.message);
        throw error;
    }
};

module.exports = connectDb;
