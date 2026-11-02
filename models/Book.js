
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        author: {
            type: String,
            required: true,
            trim: true
        },
        isbn: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        publishedYear: {
            type: Number
        },
        available: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Book", bookSchema);
