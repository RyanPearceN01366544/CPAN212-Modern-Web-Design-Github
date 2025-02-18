/* Project setup: For the server
1 - new project folder
2 - open an integrated terminal
3 - run these commands:
    npm init -y
    npm i express nodemon
    (optional) -> go into package.json and add "type": "module" to enable import from 
*/
 
// [Please enable only ONE of these] 
import express from "express"; // if you are using type: module
import logger from "./middleware/logger.js";
import auth from "./middleware/auth.js";
 // const express = require("express"); // if using common JS (Default)
 
const app = express();
const PORT = process.env.PORT || 8000;

// middlelware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(logger) // -> This is application wide, meaning it will play for all websites. 

// routes
app.get("/", logger, (req, res) => {
  res.send("Welcome to our server");
});

app.get("/about", (req, res) => {
    res.send("Welcome to our server");
});

app.get("/login", (req, res) => {
    res.send("We have received your request - Login!");
});

app.post("/login", (req, res) => {
    res.send("We have stolen all of your data!");
});

app.get("/fetchData", auth, (req, res) => {
    res.send("Hi " + req.query + "! Here is your data!");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
 
// Catch-All Statement (Always keep under routing.)
app.use("", (req, res) => {
  res.status(404).send("Page not found");
});