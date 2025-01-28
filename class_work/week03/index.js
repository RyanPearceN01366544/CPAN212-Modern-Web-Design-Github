import express, { query } from "express"
import dotenv from "dotenv"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// CRUD -> Server is setup to do these things. (Create, Read, Update, Delete)
// Methods: GET(Read), POST(Create), PUT(Update), DELETE(Delete.)

app.get("/", (req, res) => {
    res.send("Boo! - GET");
});
app.post("/", (req, res) => {
    res.send("Boo! - POST");
});
app.put("/", (req, res) => {
    res.send("Boo! - PUT");
});
app.delete("/", (req, res) => {
    res.send("Boo! - DELETE");
});

app.get("/search", (req, res) => {
    console.log(req.url);
    console.log(req.headers);
    console.log(req.query);
    console.log(req.params);
    console.log(req.body);
    res.send("You came to the /search route!");
});

app.get("/item/:itemID", (req, res) => {
    console.log(req.url);
    console.log(req.headers);
    console.log(req.query); // Used for searching. '?varname=value' (Example: item?genre=cool+stuff -> This would give me "cool stuff")
    console.log(req.params.itemID); // Used for parameters. ':varname' (Example: item/:itemid)
    console.log(req.body);
    res.send(`You came to the /search route! You searched for ${req.query.test}`);
});


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});