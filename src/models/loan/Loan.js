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
    _writedata(file, data) {
        fs.writeFile(file, JSON.stringify(data), "utf-8", function (err) {
            if (err) throw err;
        });
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
        this._writedata(this.file, this.data);
    }
    updateLoan(id, returnDate) {
        for (const loanData in this.data) {
            if (loanData == id) {
                console.log("true");
                console.log(this.data[loanData].returned);
                this.data[loanData].returned = true;
                this.data[loanData].dateReturned = returnDate.toDateString();
                this._writedata(this.file, this.data);
            }
        }
    }
    getActiveLoans() {
        let data = {};
        for (const loanData in this.data) {
            if (this.data[loanData].returned == false) {
                data[loanData] = this.data[loanData];
            }
        }
        return data;
    }

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
