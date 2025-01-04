const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* ============================================================= */
const login = async (req, res) => {
    const { user, pwd } = req.body;

    if (!user || !pwd)
        return res
            .status(400)
            .json({ message: "Username and password are required." });

    const foundUser = await User.findOne({ username: user }).exec();

    if (!foundUser) return res.sendStatus(401); //Unauthorized

    // evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);

    if (match) {
        // create JWTs
        const accessToken = jwt.sign(
            { username: foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "3m" }
        );

        // Store token in a secure cookie (HTTP-only)
        res.cookie("jwt", accessToken, {
            httpOnly: true, // Can't be accessed by JavaScript (prevents XSS attacks)
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production (HTTPS)
            sameSite: "None", // Required for cross-site cookies (CORS issues)
            maxAge: 3 * 60 * 1000, // Token expires in 10 minutes
        });

        // Respond with access token
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
};

/* ============================================================= */
module.exports = { login };
