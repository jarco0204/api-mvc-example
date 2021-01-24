const fs = require("fs"); //File-System manipulation

module.exports.Loan = class {
    constructor() {
        this.file = "src/models/loan/loans.json";
        this.data = this._loadData(this.file);
        console.log("The data in Book Model is: %s", this.data);
    }
    //Private method that loads data in order to reduce the I/O operations
    _loadData(file) {
        return JSON.parse(fs.readFileSync(file, "utf-8"));
    }
    //Method to check if the book id exists or not
    bookExists(loanID) {
        if (loanID in this.data) {
            return true;
        }
        return false;
    }
    //Method to add a loan given its a id
    addLoan(id, bodyData) {
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
};
