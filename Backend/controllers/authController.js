const jwt = require('jsonwebtoken');
require("dotenv").config();
const connectDB = require('../config/db');
const bcrypt = require('bcryptjs');


const generateJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}


exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if user already exists
        const con = await connectDB();
        const [existingUser] = await con.execute('SELECT * FROM users WHERE email = ?', [email]);

        if (existingUser.length > 0) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        const query = 'INSERT INTO users (name, email, password, profileImageUrl) VALUES (?, ?, ?, ?)';
        const [result] = await con.execute(query, [fullName, email, hashedPassword, profileImageUrl]);

        con.end();

        const user = {
            id: result.insertId,  // Capture the ID of the inserted user
            fullName,
            email,
            hashedPassword,
            profileImageUrl
        };

        return res.status(201).json({
            user,
            token: generateJWT(result.insertId)
        });

    } catch (err) {
        res.status(500).json({ message: "Error registering User", error: err.message });
    }
};

exports.loginUser = async (req, res) => {

}
exports.getUserInfo = async (req, res) => {

}