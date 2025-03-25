import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    
    description: {
        type: String,
        require: true,
        trim: true
    },
    
    difficulty: {
        type: String,
        require: true,
        trim: true,
    },
    
    ingredients: {
        type: [String],
        require: true,
    },

    steps: {
        type: [String],
        require: true,
    }
});

const Recipe = mongoose.model("recipes", recipeSchema);
export default Recipe;