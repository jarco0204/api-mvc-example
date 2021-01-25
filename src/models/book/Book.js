const fs = require("fs"); //File-System manipulation

module.exports.Book = class {
    //Initiate object
    constructor() {
        this.file = "src/models/book/books.json";
        this.data = this._loadData(this.file);
        console.log("The data in Book Model is: %s", this.data);
    }
    //Private method that loads data in order to reduce the I/O operations
    _loadData(file) {
        return JSON.parse(fs.readFileSync(file, "utf-8"));
    }

    //Method to check if the book id exists or not
    bookExists(bookId) {
        if (bookId in this.data) {
            return true;
        }
        return false;
    }
    //Method to add a book given its a id
    addBook(id, bodyData) {
        this.data[id] = bodyData;
        fs.writeFile(
            this.file,
            JSON.stringify(this.data),
            "utf-8",
            function (err) {
                if (err) throw err;
            },
        );
    }
    //Method to get an individual book provided an id
    getBook(id) {
        return this.data[id];
    }
    //Method to get all the books that match the provided year
    getBooksByYear(year) {
        let data = {};
        let size = 0;
        for (const bookData in this.data) {
            if (this.data[bookData].year == year) {
                size++;
                data[bookData] = this.data[bookData];
            }
        }
        if (size >= 1) {
            return data;
        } else {
            return { message: "no books matched the year" };
        }
    }
    //Method to return all books providing its id and name
    getAllBooks() {
        let data = {};
        for (const bookData in this.data) {
            data[bookData] = this.data[bookData].name;
        }
        return data;
    }
    //Special method that checks to see if there exists a loan with such bookID
    isBookAvailable(bookId) {
        const loanFile = "src/models/loan/loans.json";
        let loanData = JSON.parse(fs.readFileSync(loanFile, "utf-8"));
        for (const loan in loanData) {
            if (loanData[loan].bookId == bookId) {
                if (loanData[loan].returned == false) {
                    return false;
                }
                return true; // can save operations
            }
        }
        return true;
    }
};
