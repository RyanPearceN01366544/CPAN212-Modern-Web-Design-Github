import express from "express";
const router = express.Router();

// Checking if in route.
router.get("/", (req, res) => {
    res.send("Welcome to the lab router! :)");
});

// Name Route
router.get("/name", (req, res) => {
    res.send("Ryan Pearce");
});

// Greeting
router.get("/greeting", (req, res) => {
    res.send("Hello! I'm Ryan Pearce and my student id is N01366544!");
});

// Add
router.get("/add", (req, res) => {});

// Calculate
router.get("/calculate", (req, res) => {});

export default router;