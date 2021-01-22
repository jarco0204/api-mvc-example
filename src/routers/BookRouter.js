const express = require("express");
const book = require("../controllers/BookController");

const router = express.Router(); //Used to handle routes using controllers

// route: /api/book/all

// GETs all the books and provides id and name of them
router.route("/all").get(book.getAllController);
// GETs and PUTs books given a specific id
router.route("/:id").get(book.getController).put(book.postController);

//route: /api/book/year/:id
// GETs books with all their information given a year
router.route("/year/:id").get(book.getBookYearController);

module.exports = router;
