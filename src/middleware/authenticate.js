const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies) {
        return res
            .status(401)
            .json({ message: "No authentication token found." }); // Proper response if token is missing
    }

    const token = cookies.jwt; // Extract token from cookies

    if (!token)
        return res
            .status(401)
            .json({ message: "Unauthorized access. Please login first." }); // No token, unauthorized with message // No token, unauthorized

    // Verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403); // Forbidden - invalid or expired token

        req.user = decoded.username; // Add the decoded username to the request object

        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authenticate;
