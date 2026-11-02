
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const bookRoutes = require("./routes/bookRoutes");

const app = express();

// Middleware to read JSON data
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.status(200).send("Library Management System API is running!");
});

// Register book routes
app.use("/api/books", bookRoutes);

// Debug message
console.log("Book routes registered at /api/books");

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });
