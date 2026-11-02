
const express = require("express");
const router = express.Router();

const {
    addBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
} = require("../controllers/bookController");

// Create a book
router.post("/", addBook);

// Get all books
router.get("/", getBooks);

// Get a single book
router.get("/:id", getBookById);

// Update a book
router.put("/:id", updateBook);

// Delete a book
router.delete("/:id", deleteBook);

module.exports = router;
