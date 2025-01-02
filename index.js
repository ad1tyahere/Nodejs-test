const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const UserModel = require('./model/userModel.js'); // Correct import

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Database connection
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("DB Connected successfully");
        app.listen(PORT, () => {
            console.log(`Server running at ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection error:", error);
    });

// Signup route
app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(`Name: ${name}, Email: ${email}, Password: ${password}`);

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email }); // Correct variable name
        console.log(existingUser);

        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save a new user
        const newUser = new UserModel({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
