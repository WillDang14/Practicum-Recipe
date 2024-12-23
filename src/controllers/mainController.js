const mainController = {};

const Recipe = require("../models/recipe");

/* ============================================================= */
mainController.get = (req, res) => {
    return res.json({
        data: "This is a full stack app!",
    });
};

/* ============================================================= */
const getRecipes = async (req, res) => {
    console.log(req.query);

    const { name, all } = req.query;

    // get all documents or limit or default=10
    const allDoc = await Recipe.count();
    let limit = Number(req.query.limit) || 10;
    if (Number(all)) limit = allDoc;

    const queryObject = {};

    //////////////////////////////////////////////////////////////
    if (name) {
        queryObject.name = { $regex: name, $options: "i" };
    }

    let result = Recipe.find(queryObject);

    result = result.limit(limit);

    const recipes = await result;

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

/* ============================================================= */
module.exports = {
    mainController,
    getRecipes,
    getRecipeById,
};

// ========================================================== //
/* 
const getRecipeByName = async (req, res) => {
    const name = req.query.name;

    const data = await Recipe.find({ name: { $regex: name, $options: "i" } });

    // console.log(data);

    res.status(200).json({ nbHits: data.length, data });
};
*/
