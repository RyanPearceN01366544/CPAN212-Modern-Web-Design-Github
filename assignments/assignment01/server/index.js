import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import _ from "lodash";
import { fileURLToPath } from "url"; // for file path

const app = express();
const PORT = process.env.PORT || 8000;
const files__ = fileURLToPath(import.meta.url); // Takes me to index.js
const dirName_ = path.dirname(files__); // Takes me to 'server' folder.
const resumeDataPath = path.join(dirName_, "/data"); // Finally 'server/data'.

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome... But you are on the wrong page!");
});

// Potentially, I could have all of these in one file but that might be for later!
app.get("/getOverview", (req, res) => { // Breaking it down but only for this one...
    // Read the file using FS. (Though not as optimal than sending the file all together [probably], I'm certain there is a way I can. I just couldn't get it to work properly.)
    fs.readFile(path.join(resumeDataPath, "Overview.json"), function(err, data) {
        if (err){ // If there is an error...
            throw err // Throw an exception.
        }
        res.send(JSON.parse(data)); // Otherwise, send the data over as JSON.
    })
});

app.get("/getEdu", (req, res) => {
    fs.readFile(path.join(resumeDataPath, "Education.json"), function(err, data) {
        if (err){
            throw err
        }
        res.send(JSON.parse(data));
    })
});

app.get("/getExp", (req, res) => {
    fs.readFile(path.join(resumeDataPath, "Experiences.json"), function(err, data) {
        if (err){
            throw err
        }
        res.send(JSON.parse(data));
    })
});

app.get("/getSkills", (req, res) => {
    fs.readFile(path.join(resumeDataPath, "Skills.json"), function(err, data) {
        if (err){
            throw err
        }
        res.send(JSON.parse(data));
    })
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
   
// Catch-All Statement (Always keep under routing.)
app.use("", (req, res) => {
    res.status(404).send("Page not found");
});