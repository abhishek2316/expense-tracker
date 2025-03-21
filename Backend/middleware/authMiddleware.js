const jwt = require('jsonwebtoken');
const { checkData } = require('../models/User');


exports.protect = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized: No token provided"
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const localIat = new Date(decoded.iat * 1000).toLocaleString(); // Convert it into local time string!
        const localExp = new Date(decoded.exp * 1000).toLocaleString();
        console.log("Decoded JWT:", decoded);
        console.log(localIat);
        console.log(localExp);
        
        if (!decoded.id) {
            return res.status(403).json({
                message: "Invalid token: Missing user ID",
                decoded,
            });
        }

        const user = await checkData(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        next();
    } catch (err) {
        console.error("JWT Error:", err.message);
        res.status(403).json({
            message: "Not Authorized, Token Failed",
            error: err.message
        });
    }
}