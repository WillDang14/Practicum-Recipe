const User = require("../models/user");

/* ============================================================= */
const getAllFavorite = async (req, res) => {
    const { userID } = req.body;

    const user = await User.findOne({ _id: userID });

    return res.status(200).json({
        nbHits: user.favoriteRecipes.length,
        favorite: user.favoriteRecipes,
    });
};

const createFavorite = async (req, res) => {
    // console.log(req.body);

    // const { recipeID, userID } = req.body;
    const { recipeID } = req.body;

    console.log("req.user =", req.user);
    console.log("recipeID =", recipeID);

    // const result = await User.updateOne(
    //     { _id: userID },
    //     { $push: { favoriteRecipes: recipeID } }
    // );
    // console.log(result);

    // const result = await User.updateOne(
    //     { _id: userID },
    //     { $addToSet: { favoriteRecipes: recipeID } }
    // );

    const result = await User.updateOne(
        { username: req.user },
        { $addToSet: { favoriteRecipes: recipeID } }
    );

    // console.log(result);

    // if (result.modifiedCount) {
    //     const user = await User.findOne({ _id: userID });

    //     return res.status(200).json({
    //         msg: "New favorite recipe is saved",
    //         favorite: user.favoriteRecipes,
    //     });
    // }

    if (!result.modifiedCount) {
        return res.status(501).json({
            msg: "Favorite recipe has been already saved ",
        });
    }

    const user = await User.findOne({ username: req.user });

    res.status(200).json({
        msg: "New favorite recipe is saved",
        favorite: user.favoriteRecipes,
    });

    // res.send("Create favorite");
    // res.status(501).json({ mssg: "Favorite recipe has been already saved " });
};

const deleteFavorite = async (req, res) => {
    // console.log(req.body);

    const { recipeID, userID } = req.body;

    // const result = await User.updateOne(
    //     { _id: userID },
    //     { $pull: { favoriteRecipes: recipeID } }
    // );

    const result = await User.updateOne(
        { username: req.user },
        { $pull: { favoriteRecipes: recipeID } }
    );

    console.log(result);

    // if (result.modifiedCount) {
    //     const user = await User.findOne({ _id: userID });

    //     return res.status(200).json({
    //         msg: "A favorite recipe has been removed",
    //         favorite: user.favoriteRecipes,
    //     });
    // }

    if (!result.modifiedCount) {
        return res.status(501).json({
            msg: "No favorite recipe found",
        });
    }

    const user = await User.findOne({ username: req.user });

    res.status(200).json({
        msg: "A favorite recipe has been removed",
        favorite: user.favoriteRecipes,
    });

    // res.status(501).json({ mssg: "No favorite recipe found" });
};
/* ============================================================= */
module.exports = {
    getAllFavorite,
    createFavorite,
    deleteFavorite,
};

/* 
result = 
{
  acknowledged: true,
  modifiedCount: 1, // ==>> this value mean new data is added to array
  upsertedId: null,
  upsertedCount: 0,
  matchedCount: 1
}

{
  acknowledged: true,
  modifiedCount: 0,  // ==>> if data already in Array ==>> not add to Array
  upsertedId: null,  
  upsertedCount: 0,  
  matchedCount: 1    
}

cần xem lại là POST hay PATCH hay PUT
*/
