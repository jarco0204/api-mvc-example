const validator = require("validator"); //Package to validate the inputs
const BookModel = require("../models/book/Book");

let book = new BookModel.Book(); //Fulfilling requirement of loading the data before the server loads

//Function to check if the id is valid or not
// If it is valid, then check to see if it exists or not
const checkValidId = (id, res) => {
    try {
        if (validator.isNumeric(id)) {
            return true;
        } else {
            throw "Book ID is not numeric!";
        }
    } catch (err) {
        console.log(err);
        res.status(404).send({ error: err });
        return false;
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
        return false;
    }
};

//Method for the bonus section of validating inputs
const validateInputs = (body) => {
    if (
        validator.isAlpha(body.name) &&
        validator.isAlphanumeric(body.authors) &&
        validator.isNumeric(body.year) &&
        validator.isAlphanumeric(body.publisher)
    ) {
        return true;
    }
    return false;
};

//Controller that handles PUT request to add a book
module.exports.postController = (req, res) => {
    if (checkValidId(req.params.id, res)) {
        if (!book.bookExists(req.params.id)) {
            //returns true or false if the book was added or not
            if (validateInputs(req.body)) {
                book.addBook(req.params.id, req.body);
                res.status(200).send({
                    message: "Book has been created successfully",
                });
            } else {
                res.status(404).send({
                    message: "Book was not created, check inputs",
                });
            }
        } else {
            res.status(201).send({ message: "Book Id is already taken" });
        }
    }
};

// Controller that GETs a book given its id
module.exports.getController = (req, res) => {
    //If book id already exists, then execute
    if (checkValidId(req.params.id, res)) {
        if (book.bookExists(req.params.id)) {
            let data = book.getBook(req.params.id);

            //This additional section checks to see if the book is available or not by checking at the loans json file
            isOnLoan = book.isBookAvailable(req.params.id);
            res.status(200).send({ bookData: data, isAvailable: isOnLoan });
        } else {
            res.status(200).send({
                error: "Book id does not exists, try again",
            });
        }
    }
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
