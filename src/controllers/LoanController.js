const validator = require("validator"); //Package to validate the inputs
const LoanModel = require("../models/loan/Loan");

let loan = new LoanModel.Loan(); //Fulfilling requirement of loading the data before the server loads

//Function to check if the id is valid or not
const checkValidId = (id, res) => {
    try {
        if (validator.isNumeric(id)) {
            return true;
        } else {
            throw "Loan ID is not numeric!";
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
        validator.isNumeric(body.bookId) &&
        validator.isDate(body.date) &&
        validator.isAlpha(body.clientName) &&
        body.returned == false &&
        body.dateReturned == null
    ) {
        return true;
    }
    return false;
};

//Controller to add an individual loan to the data
// Checks to see if it valid, and then if the id doesn't exists
module.exports.addController = (req, res) => {
    if (checkValidId(req.params.id)) {
        if (!loan.loanExists(req.params.id)) {
            if (validateInputs(req.body)) {
                loan.addLoan(req.params.id, req.body);
                res.status(200).send({
                    message: "Loan has been successfully created",
                });
            } else {
                res.status(404).send({
                    message: "Loan was not created, check inputs",
                });
            }
        } else {
            res.status(201).send({
                message:
                    "Loan Id already exists, try PUT method in order to update it",
            });
        }
    }
};

// Controller that updates the loan state
// Checks to see if it's valid, then if the id does exists
module.exports.updateController = (req, res) => {
    if (checkValidId(req.params.id)) {
        if (loan.loanExists(req.params.id)) {
            loan.updateLoan(req.params.id, new Date(Date.now()));
            res.status(200).send({ message: "Loan has been updated" });
        } else {
            res.status(201).send({
                message:
                    "Loan Id does not exist, try PUT method in order to create it",
            });
        }
    }
};

// Controller that gets all the active loans
// If the returned object has length of 0, then send special message
module.exports.getActiveController = (req, res) => {
    let data = loan.getActiveLoans();
    if (Object.keys(data).length == 0) {
        res.status(201).send({ message: "No active Loans" });
    } else {
        res.status(200).send({ ActiveLoans: data });
    }
};

// Controller that gets all the finished loans
// If the returned object has length of 0, then send special message
module.exports.getFinishedController = (req, res) => {
    let data = loan.getFinishedLoans();
    if (Object.keys(data).length == 0) {
        res.status(201).send({ message: "No finished Loans" });
    } else {
        res.status(200).send({ FinishedLoans: data });
    }
};
