const fs = require("fs"); //File-System manipulation

module.exports.Loan = class {
    constructor() {
        this.file = "src/models/loan/loans.json";
        this.data = this._loadData(this.file);
        console.log("The data in Loan Model is: %s", this.data);
    }
    //Private method that loads data in order to reduce the I/O operations
    _loadData(file) {
        return JSON.parse(fs.readFileSync(file, "utf-8"));
    }
    //Private method that writes data to file after an update
    _writedata() {
        fs.writeFileSync(
            this.file,
            JSON.stringify(this.data),
            "utf-8",
            function (err) {
                if (err) throw err;
            },
        );
    }
    //Method to check if the book id exists or not
    loanExists(loanID) {
        if (loanID in this.data) {
            return true;
        }
        return false;
    }
    //Method to add a loan given its a id
    addLoan(id, bodyData) {
        this.data[id] = bodyData;
        this._writedata();
    }
    //This method updates the loan so that it changes the returned and dateReturned attributes of a loan
    updateLoan(id, returnDate) {
        for (const loanData in this.data) {
            if (loanData == id) {
                this.data[loanData].returned = true;
                this.data[loanData].dateReturned = returnDate;
                this._writedata();
            }
        }
    }
    //retrieves all the active loans, meaning that their returned attribute is set to false
    getActiveLoans() {
        let data = {};
        for (const loanData in this.data) {
            if (this.data[loanData].returned == false) {
                data[loanData] = this.data[loanData];
            }
        }
        return data;
    }
    //method retrieves all the loans that have finished, so their returned state is true
    getFinishedLoans() {
        let data = {};
        for (const loanData in this.data) {
            if (this.data[loanData].returned == true) {
                data[loanData] = this.data[loanData];
            }
        }
        return data;
    }
};
