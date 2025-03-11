import express from "express";
import cors from "cors";
import path from "path";
import _ from "lodash";
import { fileURLToPath } from "url"; // for file path

const app = express(); // Init express.
const PORT = process.env.PORT || 8000; // Set to 8000 
const files__ = fileURLToPath(import.meta.url); // Takes me to index.js
const dirName_ = path.dirname(files__); // Takes me to 'server' folder.
const resumeDataPath = path.join(dirName_, "/data"); // Finally 'server/data'.

const corsOptions = {
    origin: (origin, callback) => { // Using a callback after some research...
        // Check if the requesting website is our websites or not. (!origin is for postman usage)
        if (origin == "http://localhost:5173" || origin == "http://localhost:3000" || !origin)
        {
            callback(null, true); // Allow.
        }
        else // Otherwise...
        {
            callback(new Error("Not allowed! Cors restricted!")); // Disallow and send an error.
        }
    },
    methods: ["GET"], // We only need to GET the data for the resume. POST+ not needed!
    allowedHeaders: ["Content-Type"], // We only need content-type.
}

app.use(cors(corsOptions)); // Set up cors so it's on all routes.
app.use(express.json()); // Parses and looks through json files.

// Potentially, I could have all of these in one file but that might be for later!
// Edit to Note: Considering I needed multiple sites for this assignment, I will leave each section as it's own file.
// If I wasn't worried about it then I could have all the resume data be sent as one file and have it decompiled on the front-end.

app.get("/getOverview", (req, res) => {
    res.sendFile(path.join(resumeDataPath, "Overview.json"));
});

app.get("/getEdu", (req, res) => {
    res.sendFile(path.join(resumeDataPath, "Education.json"));
});

app.get("/getExp", (req, res) => {
    res.sendFile(path.join(resumeDataPath, "Experiences.json"));
});

app.get("/getSkills", (req, res) => {
    res.sendFile(path.join(resumeDataPath, "Skills.json"));
});

app.listen(PORT, () => { // Listen to the PORT and open the tunnel.
    console.log(`http://localhost:${PORT}`); // Show that it is running.
});
   
// Catch-All Statement (Always keep under routing.)
app.use("", (req, res) => { // Send an error in case of bad routing.
    res.status(404).send("Page not found");
});

/* -- OBSOLUTE CODE -> LEFT IN FOR REVIEW IF WANTED. (ORIGINALLY WAS LOCATED AT LINE: 36)
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
*/