const request = require("request");
let myurl = "http://localhost:3000";

//Data
let loan1 = {
    bookId: "1",
    date: "2021-01-22",
    clientName: "ElPepe",
    returned: false,
    dateReturned: null,
};
let loan2 = {
    bookId: "2",
    date: "2021-01-23",
    clientName: "Hannah",
    returned: false,
    dateReturned: null,
};
let loan3 = {
    bookId: "3",
    date: "2021-01-24",
    clientName: "Yuri",
    returned: false,
    dateReturned: null,
};

//-------testing adding a loan operation----
request.put(
    {
        headers: { "content-type": "application/json" },
        url: myurl + "/api/loan/1",
        body: JSON.stringify(loan1),
    },
    function (error, response, body) {
        console.log(body);
    },
);

//This put request will fail because ID is not numeric
request.put(
    {
        headers: { "content-type": "application/json" },
        url: myurl + "/api/loan/2d",
        body: JSON.stringify(loan2),
    },
    function (error, response, body) {
        console.log(body);
    },
);
request.put(
    {
        headers: { "content-type": "application/json" },
        url: myurl + "/api/loan/2",
        body: JSON.stringify(loan2),
    },
    function (error, response, body) {
        console.log(body);
    },
);
request.put(
    {
        headers: { "content-type": "application/json" },
        url: myurl + "/api/loan/3",
        body: JSON.stringify(loan3),
    },
    function (error, response, body) {
        console.log(body);
    },
);

//-------------test POST operation in order to update loans
request.post(
    {
        headers: { "content-type": "application/json" },
        url: myurl + "/api/loan/1",
    },
    function (error, response, body) {
        console.log(body);
    },
);
request.post(
    {
        headers: { "content-type": "application/json" },
        url: myurl + "/api/loan/2",
    },
    function (error, response, body) {
        console.log(body);
    },
);

//----------- testing GET operation to get all finished loans, it returns the loans that have been updated by the post method
request.get(
    {
        headers: { "content-type": "application/json" },
        url: myurl + "/api/loan/finished",
    },
    function (error, response, body) {
        console.log(body);
    },
);

//----------- testing GET operation to get open loans
request.get(
    {
        headers: { "content-type": "application/json" },
        url: myurl + "/api/loan/open",
    },
    function (error, response, body) {
        console.log(body);
    },
);

// --------- testing GET operation to see if a book is available
request.get(
    {
        headers: { "content-type": "application/json" },
        url: myurl + "/api/book/2",
    },
    function (error, response, body) {
        console.log(body);
    },
);
//Since this is an active loan, then the book is not available
request.get(
    {
        headers: { "content-type": "application/json" },
        url: myurl + "/api/book/3",
    },
    function (error, response, body) {
        console.log(body);
    },
);
