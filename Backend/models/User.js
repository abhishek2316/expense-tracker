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

module.exports = { hashPassword, checkEmailExists, checkPassword };
