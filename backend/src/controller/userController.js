const User = require("../models/user");
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

//Registration
exports.registerUser = async (req, res) => {
    const { first_name, last_name, email, password, phone, address, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            phone,
            address,
            role,
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Logging 
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Cannot find account" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            token,
            user: {
                id: user._id,
                first_name: user.first_name,
                email: user.email,
                role: user.role 
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Profile
exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: "User not found" }); 
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Logout
exports.logOut = async (req, res) => {
    // Since JWTs are stateless, there's no server-side session to destroy.
    // Simply inform the client to remove the token from their storage.

    res.json({ message: "Logged out successfully" });
};