import http from "http"
import fs from "fs"
import dotenv from "dotenv";

dotenv.config();
const app = http.createServer((req, res) => {
    // I will admit, all of the sites below were made with GPT.
    // From my understanding, the sites don't matter at all,
    // only serving to be a 
    if (req.url === "/") { // The extension of which the user wants to connect to.
        if (req.method === "GET") { // We only want GET.
            let website = fs.readFileSync("./bookstore/Home.html") // Load the HTML file into an object.
            res.end(website); // Send object (HTML) and display on user's screen.
        }
        else {
            res.end("Error: You are only allowed to GET from the website!") // End Error Message.
        } // The rest is basically the same but with the different sites and toLowerCase for the sites since they're simple.
    }
    else if (req.url.toLowerCase() === "/about") // I know some things like ids will probably not use toLowerCase but for here it should be fine.
    {
        if (req.method === "GET") {
            let website = fs.readFileSync("./bookstore/About.html")
            res.end(website)
        }
        else{
            res.end("Error: You are only allowed to GET from the website!")
        }
    }
    else if (req.url.toLowerCase() === "/contact")
    {
        if (req.method === "GET") {
            let website = fs.readFileSync("./bookstore/Contact.html")
            res.end(website)
        }
        else{
            res.end("Error: You are only allowed to GET from the website!")
        }
    }
    else if (req.url.toLowerCase() === "/login")
    {
        if (req.method === "GET") {
            let website = fs.readFileSync("./bookstore/Login.html")
            res.end(website)
        }
        else{
            res.end("Error: You are only allowed to GET from the website!")
        }
    }
    else if (req.url.toLowerCase() === "/register"){
        if (req.method === "GET") {
            let website = fs.readFileSync("./bookstore/Register.html")
            res.end(website)
        }
        else{
            res.end("Error: You are only allowed to GET from the website!")
        }
    }
    else {
        if (req.method === "GET") {
            let website = fs.readFileSync("./bookstore/NotFound.html")
            res.end(website)
        }
        else{
            res.end("Error: You are only allowed to GET from the website!")
        }
    }
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`)
});