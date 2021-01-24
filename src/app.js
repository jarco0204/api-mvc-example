const express = require("express");
const bookRouter = require("./routers/BookRouter"); //Modularize the code
const loanRouter = require("./routers/LoanRouter");

//Instantiation of main app
const port = 3000;
const app = express();

//Middleware
app.use(express.json()); // support json encoded bodies

// Book Router
app.use("/api/book", bookRouter);
// Loan Router
app.use("/api/loan", loanRouter);

//Listening to request
module.exports.start = () => {
    app.listen(port, () => {
        console.log("Express API server is listening on port 3000");
    });
};
