import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import recipe_router from "./routers/recipe_router.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("Temporary.");
});

app.use("/recipe/", recipe_router);

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Database is Connected!");
        app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`);
        })
    }
);

app.use("", (req, res) => {
    res.status(404).send("404 Error: Page not found!");
})