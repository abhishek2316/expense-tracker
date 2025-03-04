const express = require('express');

const{
    registerUser,
    loginUser,
    getUserInfo
} = require("../controllers/authController");

const router = express.Router();
router.post("/register", registerUser);
router.post("/loginUser", loginUser);
// router.get("/getUser", protect, getUserInfo);

module.exports = router;