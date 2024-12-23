// Create Schema for Data
const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    recipeID: {
        type: Number,
        // required: [true, "Recipe ID must be provided!"],
        trim: true,
    },
    name: {
        type: String,
        required: [true, "Recipe Name must be provided!"],
        trim: true,
    },
    ingredients: [
        {
            name: {
                type: String,
                trim: true,
            },
            preparation: {
                type: String,
                trim: true,
            },
        },
    ],
    directions: [
        {
            type: String,
            trim: true,
        },
    ],
    recipeImage: {
        type: String,
        trim: true,
    },
    timeCook: {
        type: String,
        trim: true,
        default: "0 mins",
    },
    createdAt: {
        type: Date,
        default: Date.now(), // create time at current time
    },
});

/////////////////////////////////////////////////////////
module.exports = mongoose.model("Recipe", recipeSchema);
