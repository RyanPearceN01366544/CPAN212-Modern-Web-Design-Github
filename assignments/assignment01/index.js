//const http = require("http")
import http from "http" // Getting the required imports for our app.
import fs from "fs"; // File System/Sharing. 

const app = http.createServer((req, res) => { // Creating the App.
    // req -> Request, res -> Response.
    // Request is what the Client am trying to ask of the server.
    // Response is the response the server sends.
    if (req.url === '/') {
        //let webpage = fs.readFileSync("./Home.html")
        res.end("Home")
    }
    else if (req.url === '/about') {
        res.end("About!");
    }
    else {
        res.end("Error! Website not found!")
    }
}) 
const PORT = 8000; // Port Const (8000 is a good default to have.)
app.listen(PORT, ()=> { // To Activate and Allow your App to be used. 
    // Treat this like how you'd treat a button where it activates when it's called.
    // The port and application will keep running until it is stopped.
    console.log(`http://localhost:${PORT}`)
})