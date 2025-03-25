import express, { request } from "express";
import Book from "../models/Book.js"; // db.books.function();

const router = express.Router();
router.get("/", (req, res) => {
    Book.find().then((results) => { // -> db.boofs
        res.json(results);
    })
});

router.get("/:id", (req, res) => {
    Book.findById(req.params.id).then((results) => { // -> db.boofs
        res.json(results);
    })
});

router.put("/:id", (req, res) => {
    Book.findByIdAndUpdate(req.params.id)
    .then(() => {
        res.json({message:"Update Successful!"})
    })
});

router.delete("/:id", (req, res) => {
    Book.findByIdAndDelete(req.params.id)
    .then(() => {
        res.json({message:"Delete Successful!"})
    })
});

router.post("/save", (req, res) => {
    const { title, author, publisher, } = request.body;

    let newBook = new Book({
        title: title,
        author: author,
        publisher: publisher,
    })

    newBook.save().then(() => {
        res.json({message: "Data Saved!"})
    })
})


router.get("/search", (req, res) => {
    const filters = {}

    if (req.query.title) {
        filters.title = req.query.title;
    }
    if (req.query.pages) {
        filters.pages = parseInt(req.query.pages);
    }
    Book.find(filters).then((results) => { // -> db.boofs
        res.json(results);
    })
});
export default router;