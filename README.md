# Library Management System API

A beginner-friendly REST API built with Node.js, Express, and MongoDB (Mongoose). It demonstrates a database model, controller functions, route mapping, and the five CRUD endpoints for books.

## Requirements

- Node.js 18 or newer
- A MongoDB database (MongoDB Atlas works)
- Postman desktop (optional, for the walkthrough)

## Run locally

1. Clone this repository and open its folder in a terminal.
2. Install dependencies with `npm install`.
3. Copy `.env.example` to `.env` and replace the example `MONGO_URI` with your MongoDB connection string. Keep `.env` private; it is ignored by Git.
4. Start the API with `npm run dev` (auto-restarts on edits) or `npm start`.
5. Open `http://localhost:5000/`. A successful response confirms the API is running. The server starts only after connecting to MongoDB.

In MongoDB Atlas, create a database user and cluster, allow your computer's IP address in Network Access, and copy the Node.js driver connection string. Replace its username, password, cluster, and database name in `.env`.

## API reference

Base URL: `http://localhost:5000`

| Method | Path | Purpose | Success |
| --- | --- | --- | --- |
| GET | `/` | Check that the API is running | 200 |
| POST | `/api/books` | Create a book | 201 |
| GET | `/api/books` | List all books | 200 |
| GET | `/api/books/:id` | Read one book by MongoDB ID | 200 |
| PUT | `/api/books/:id` | Update a book by ID | 200 |
| DELETE | `/api/books/:id` | Delete a book by ID | 200 |

Book JSON fields:

```json
{
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien",
  "isbn": "9780547928227",
  "publishedYear": 1937,
  "available": true
}
```

`title`, `author`, and `isbn` are required. ISBN values must be unique. `available` defaults to `true`; MongoDB adds the document ID and timestamps.

## Postman walkthrough

Use `http://localhost:5000` as the base URL and send JSON bodies with `Content-Type: application/json`.

1. `POST /api/books` with the JSON above. Copy the returned `book._id`.
2. `GET /api/books` to see all books.
3. `GET /api/books/<id>` to fetch the created book.
4. `PUT /api/books/<id>` with a JSON body containing the fields to update, for example `{ "available": false }`.
5. `DELETE /api/books/<id>` and then repeat GET by ID to confirm it was removed.

For a repeatable first-run walkthrough, import `postman_qa_collection.json` into Postman and run its requests in order. The collection creates the three demo books, runs CRUD and validation checks, deletes its temporary QA record, and checks that only the three demo books remain. It expects an empty `books` collection; if you run it again after the seed data is present, the create requests will return 409 for duplicate ISBNs.

Malformed IDs return 400, missing books return 404, invalid model data returns 400, and duplicate ISBN values return 409.

## How the code is organized

- `server.js` configures Express, connects to MongoDB, and mounts the book routes.
- `models/Book.js` defines the Mongoose schema and collection model.
- `routes/bookRoutes.js` maps HTTP methods and paths to controller functions.
- `controllers/bookController.js` performs database operations and returns HTTP responses.

## Troubleshooting

- **MONGO_URI is missing:** copy `.env.example` to `.env` and set the connection string.
- **Authentication or server-selection error:** check the Atlas database username/password, IP allowlist, and cluster status. URL-encode special characters in the password.
- **Port already in use:** set another `PORT` value in `.env`.
- **Duplicate ISBN:** use a different ISBN; it is a unique field.
