const mainController = {};

const Recipe = require("../models/recipe");

/* ============================================================= */
mainController.get = (req, res) => {
    return res.json({
        data: "This is a full stack app!",
    });
};

/* ============================================================= */
const getAllRecipes = async (req, res) => {
    // console.log(req.query);

    // all recipes
    const recipes = await Recipe.find();

    res.status(200).json({ nbHits: recipes.length, recipes });
};

const getRecipeById = async (req, res) => {
    const { id } = req.params;

    const recipe = await Recipe.findById(id);

    if (!recipe) {
        return res
            .status(404)
            .json({ msg: `Can not find recipe with ID = ${id}` });
    }

    res.status(200).json(recipe);
};

const getRecipeByName = async (req, res) => {
    const name = req.query.name;

    const data = await Recipe.find({ name: { $regex: name, $options: "i" } });

    // console.log(data);

    res.status(200).json({ nbHits: data.length, data });
};
/* ============================================================= */
module.exports = {
    mainController,
    getAllRecipes,
    getRecipeById,
    getRecipeByName,
};
