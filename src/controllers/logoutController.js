// logout.js (Controller)
const logout = (req, res) => {
    // Check for jwt cookie
    const cookies = req.cookies;

    if (!cookies?.jwt)
        return res.status(200).json({
            message: "No JWT found in cookies, user is not logged in.",
        }); // Bad Request if no JWT cookie

    // Clear the jwt cookie
    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: process.env.NODE_ENV === "production",
    });

    // Send success response (200 - OK status)
    res.status(200).json({ message: "User logged out successfully." });
};

/* ============================================================= */
module.exports = { logout };
