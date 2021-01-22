const validator = require("validator"); //Package to validate the inputs
const BookModel = require("../models/book/Book");

let book = new BookModel.Book(); //Fulfilling requirement of loading the data before the server loads

//Function to check if the id is valid or not
// If it is valid, then check to see if it exists or not
const checkValidId = (id, res) => {
    try {
        if (validator.isNumeric(id)) {
            if (book.bookExists(id)) {
                return false;
            } else {
                return true;
            }
        } else {
            throw "Book ID is not numeric!";
        }
    } catch (err) {
        console.log(err);
        res.status(404).send({ error: err });
    }
};

//Validator Function to check if the year provided is valid or not
const checkValidYear = (year, res) => {
    try {
        if (validator.isNumeric(year)) {
            return true;
        } else {
            throw "Year is not numeric!";
        }
    } catch (err) {
        console.log(err);
        res.status(404).send({ error: err });
    }
};

//Controller that handles PUT request to add a book
module.exports.postController = (req, res) => {
    if (checkValidId(req.params.id, res)) {
        console.log("Book will be created");
        book.addBook(req.params.id, req.body);
        res.status(200).send({ message: "Book has been created" });
        return; // In order to avoid executing other .send
    }
    res.status(200).send({ message: "Book not created" });
};

// Controller that GETs a book given its id
module.exports.getController = (req, res) => {
    //If book id already exists, then execute
    if (!checkValidId(req.params.id, res)) {
        let data = book.getBook(req.params.id);
        res.status(200).send(data);
        return; // In order to avoid executing other .send
    }
    res.status(200).send({ error: "Book id does not exists, try again" });
};

//Controller to GET all the books in the JSON
module.exports.getAllController = (req, res) => {
    let data = book.getAllBooks();
    res.status(200).send(data);
};

//Controller to GET books provided their year
module.exports.getBookYearController = (req, res) => {
    if (checkValidYear(req.params.id, res)) {
        let data = book.getBooksByYear(req.params.id);
        res.status(200).send(data);
    }
};
