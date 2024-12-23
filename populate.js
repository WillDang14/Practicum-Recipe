require("dotenv").config();

// DB
const connectDB = require("./src/db/connect");

// Models
const Recipe = require("./src/models/recipe");

// File with list of Data
const jsonRecipes = require("./recipes.json");

///////////////////////////////////////////////////////////
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);

        // Remove all products in DB currently
        await Recipe.deleteMany();

        // Populate new data to DB
        await Recipe.create(jsonRecipes);

        console.log("Success!!!!");

        process.exit(0);
    } catch (error) {
        console.log(error);

        process.exit(1);
    }
};

start();
