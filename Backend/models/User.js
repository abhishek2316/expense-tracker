const connectDb = require("../config/db");
const bcrypt = require("bcryptjs");


const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};


const checkEmailExists = async (email) => {
    try {
        const conn = await connectDb();
        const query = 'SELECT * FROM user WHERE email = ?';
        const [results] = await conn.execute(query, [email]);
        return results.length > 0 ? results[0] : null;
    } catch (error) {
        console.error("Error checking email:", error.message);
        throw error;
    }
};

const checkPassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error("Error comparing password:", error.message);
        throw error;
    }
};

const checkData = async (id) => {
    try {
        const pool = await connectDb();
        const connection = await pool.getConnection();
        const query = `SELECT id, name, email, profileImageUrl FROM ${process.env.DATABASE}.user WHERE id = ?`;
        const [results] = await connection.execute(query, [id]);
        connection.release();
        return results.length > 0 ? results[0] : null;
    } catch (error) {
        console.error("Error checking id:", error.message);
        throw error;
    }
}

module.exports = { hashPassword, checkEmailExists, checkPassword, checkData };
