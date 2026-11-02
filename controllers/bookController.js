
const Book = require("../models/Book");

// Add a new book
exports.addBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json({
            message: "Book added successfully",
            book
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// Get all books
exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get a single book by ID
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({
            message: "Invalid book ID"
        });
    }
};

// Update a book
exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book updated successfully",
            book
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// Delete a book
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: "Invalid book ID"
        });
    }
};
