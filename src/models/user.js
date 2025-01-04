const mongoose = require("mongoose");

/* ============================================================= */
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    favoriteRecipes: [
        {
            type: mongoose.Schema.Types.ObjectID,
            ref: "Recipe",
        },
    ],
});

/* ============================================================= */
module.exports = mongoose.model("User", userSchema);
