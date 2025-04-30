const express = require("express");
const { registerUser, loginUser , getProfile , logOut } = require("../controller/userController");
const authenticateToken = require("../Auth/auth");

const router = express.Router();

// Register user
router.post('/register', registerUser);

// Login user 
router.post('/login', loginUser); 

//User's profile
router.get('/profile',authenticateToken,getProfile);

// Logout user
router.post('/logout', authenticateToken, logOut); 

module.exports = router;