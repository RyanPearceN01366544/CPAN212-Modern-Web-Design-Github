import express, {request} from "express";
import Recipe from '../models/Recipe.js';


const recipe_router = express.Router();

// -- Getting all Recipes --
recipe_router.get("/", (req, res) => {
    Recipe.find({}).then((result_) => {
        res.json(result_);
    })
});

// -- Getting Recipe by ID.
recipe_router.get("/:id", (req, res) => {
    Recipe.findById(req.params.id).then((result_) => {
        console.log(result_);
        res.json(result_);
    });
    
})

// -- Adding Recipe --
recipe_router.post("/", (req, res) => {
    const {name, description, difficulty, ingredients, steps} = req.body;
    
    const newRecipe_ = new Recipe({
        name: name,
        description: description,
        difficulty: difficulty,
        ingredients: ingredients,
        steps: steps
    });

    newRecipe_.save().then(() => {
        res.send("Recipe Saved!");
    });
})

// -- Edit Recipe --
recipe_router.put("/:id", (req, res) => {
    const {name, description, difficulty, ingredients, steps} = req.body;

    const data_ = {
        name: name,
        description: description,
        difficulty: difficulty,
        ingredients: ingredients,
        steps: steps,
    };

    Recipe.findByIdAndUpdate(req.params.id, {$set: data_}).then((updatedRecipe_) => {
        res.send("Updated!");
    });
})

// -- Delete Recipe --
recipe_router.delete('/:id', (req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
    .then(() => {
        res.json({message:"Delete Successful!"})
    })
})

export default recipe_router;