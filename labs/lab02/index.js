import express from "express";
import lab_router from "./routers/lab_router.js";

const app =express();
const PORT = process.env.PORT || 9000;

// Import Router
// -> localhost:${PORT}/lab
app.use('/lab', lab_router);

app.get('/', (req, res) => {
    res.send("Welcome!");
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});