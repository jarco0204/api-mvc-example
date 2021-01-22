const express = require("express");
const bookRouter = require("./routers/BookRouter"); //Modularize the code

//Instantiation of main app
const port = 3000;
const app = express();

//Middleware
app.use(express.json()); // support json encoded bodies

// Add new book route
app.use("/api/book", bookRouter);
// app.put("/api/book/:id", function (req, res)
// app.use("/api/loan", loanRouter);

//Listening to request
module.exports.start = () => {
    app.listen(3000, () => {
        console.log("server is started");
    });
};
