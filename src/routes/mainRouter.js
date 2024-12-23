const express = require("express");

const router = express.Router();

const {
    mainController,
    getAllRecipes,
    getRecipeById,
    getRecipeByName,
} = require("../controllers/mainController.js");

/* ============================================================= */
router.get("/", mainController.get);

router.get("/recipes/all", getAllRecipes);

router.get("/recipes/:id", getRecipeById);

router.get("/search", getRecipeByName);

/* ============================================================= */
module.exports = router;
