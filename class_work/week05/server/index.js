import express from "express"; // if you are using type: module
import cors from "cors";
 
const app = express();
const PORT = process.env.PORT || 8000;

// middlelware
app.use(cors());
app.use(express.urlencoded({extended: true})); // For HTML Form
app.use(express.json());

// routes
app.get("/", (req, res) => {
    res.send("Welcome!");
})

app.post("/login", (req, res) => {
    console.log(req.body);
    res.send(["I stole your data!"]);
});

app.get("/data", (req, res) => {
    const data = {
        fName: "Ryan",
        lName: "Pearce"
    }
    res.send(data);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
 
// Catch-All Statement (Always keep under routing.)
app.use("", (req, res) => {
  res.status(404).send("Page not found");
});