const bcrypt = require("bcrypt");
const User = require("../models/user");

/* ============================================================= */
exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Hash password and save the user
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await User.create({
            username: username,
            password: hashedPassword,
            favoriteRecipes: [],
        });

        console.log(result);

        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error during registration", error });
    }
};
