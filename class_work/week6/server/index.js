// -- IMPORTS --
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import user_router from "./routers/user_router.js";
//import book_router from "./routers/book_router.js"; 

// -- VARS --
dotenv.config();
const app = express();
const PORT = process.env.PORT || 6000;



// -- MIDDLEWARE --
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// --- ROUTES --
app.use("/user", user_router);
//app.use("/bookstore", book_router);

// -- START SERVER --
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("DB is Connected!");
        app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`);
        })
    }
);
