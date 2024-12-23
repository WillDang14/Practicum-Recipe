const express = require("express");

const router = express.Router();

const {
    mainController,
    getRecipes,
    getRecipeById,
} = require("../controllers/mainController.js");

/* ============================================================= */
router.get("/", mainController.get);

router.get("/recipes", getRecipes);

router.get("/:id", getRecipeById);

/* ============================================================= */
module.exports = router;
