import express from "express";
import Recipe from "../models/Recipe.js";

const recipe_router = express.Router();

recipe_router.get("/", (req, res) => {
    res.send("Recipe! :D");
});

recipe_router.get("/:id", (req, res) => {
    Recipe.findByID(req.params.id).then((result) => {
        
    });
})

recipe_router.post("/", (req, res) => {
    const {name_, description_, difficulty_, ingredients_, steps_} = req.body;
    
    const newRecipe_ = new Recipe({
        name: name_,
        description: description_,
        difficulty: difficulty_,
        ingredients: ingredients_,
        steps: steps_
    });

    newRecipe_.save().then(() => {
        res.send("Recipe Saved!");
    });
})

export default recipe_router;