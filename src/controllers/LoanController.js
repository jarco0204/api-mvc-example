const validator = require("validator"); //Package to validate the inputs
const LoanModel = require("../models/loan/Loan");

let loan = new LoanModel.Loan(); //Fulfilling requirement of loading the data before the server loads

//Function to check if the id is valid or not
// If it is valid, then check to see if it exists or not
const checkValidId = (id, res) => {
    try {
        if (validator.isNumeric(id)) {
            if (loan.loanExists(id)) {
                return true;
            } else {
                return false;
            }
        } else {
            throw "Loan ID is not numeric!";
        }
    } catch (err) {
        console.log(err);
        res.status(404).send({ error: err });
    }
};

module.exports.addController = (req, res) => {
    console.log("it executes");
    //Loan ID does not need to exists in order to add it
    if (!checkValidId(req.params.id)) {
        loan.addLoan(req.params.id, req.body);
        res.status(200).send({ message: "Loan has been created" });
    }
};
