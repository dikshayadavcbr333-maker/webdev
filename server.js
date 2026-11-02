
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

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

async function startServer() {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is missing. Copy .env.example to .env and add your MongoDB connection string.");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully!");

    return app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

if (require.main === module) {
    startServer().catch((error) => {
        console.error("Unable to start the server:", error.message);
        process.exitCode = 1;
    });
}

module.exports = { app, startServer };
