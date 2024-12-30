const express = require("express");

const router = express.Router();

const {
    mainController,
    getRecipes,
    getRecipeById,
    searchByIngredient,
} = require("../controllers/mainController.js");
const { route } = require("../app.js");

/* ============================================================= */
router.get("/", mainController.get);

router.get("/recipes", getRecipes);

router.get("/recipes/:id", getRecipeById);

router.get("/search", searchByIngredient);
/* ============================================================= */
module.exports = router;
