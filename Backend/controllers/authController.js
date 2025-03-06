const jwt = require("jsonwebtoken");
require("dotenv").config();
const { hashPassword, checkEmailExists, checkPassword } = require("../models/User");
const connectDb = require("../config/db");


const generatejwt = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};


exports.registerUser = async (req, res) => {
    const { fullname, email, password, profileImageUrl } = req.body;

    if (!fullname || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        
        const existingUser = await checkEmailExists(email);
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists." });
        }

        
        const hashedPassword = await hashPassword(password);

        
        const conn = await connectDb();
        const query = 'INSERT INTO user (name, email, password, profileImageUrl) VALUES (?, ?, ?, ?)';
        
        
        const [result] = await conn.execute(query, [fullname, email, hashedPassword, profileImageUrl]);

        
        const user = {
            id: result.insertId,
            fullname,
            email,
            password,
            profileImageUrl
        };

        return res.status(201).json({
            user,
            token: generatejwt(result.insertId)
        });

    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({ message: "Error while registering the records!", error: err.message });
    }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    if( !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }
    try {
        const user = await checkEmailExists(email)
        if(!user){
            return res.status(400).json({ message: "Invalid Credentials." });
        }
        const pass = await checkPassword(password, user.password);
        if (!pass) {
            return res.status(400).json({ message: "Invalid Credentials." });
        }
        res.status(200).json({
            id: user.insertId,
            user,
            token: generatejwt(user.insertId)
        })
    } catch (error) {
        console.error("Error:", err.message);
        res.status(500).json({ message: "Error registering user!", error: err.message });
    }
};
exports.getUserInfo = async (req, res) => {
    
};
