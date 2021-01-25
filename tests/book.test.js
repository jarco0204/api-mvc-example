const request = require("request");
let myurl = "http://localhost:3000";

//Data
let book1 = {
    name: "JohanBiography",
    authors: "God",
    year: "1999",
    publisher: "Manuel",
};
let book2 = {
    name: "PlatoRepublic",
    authors: "Socrates",
    year: "169",
    publisher: "Greek",
};
let book3 = {
    name: "ScieceOfFuture",
    authors: "EdgarPoe",
    year: "1999",
    publisher: "Babel",
};
//------------------Testing PUT operation---------

// showing that bookID needs to be numeric, it doesn't add it
request.put(
    {
        headers: { "content-type": "application/json" },
        url: myurl + "/api/book/1fail",
        body: JSON.stringify(book1),
    },
    function (error, response, body) {
        console.log(body);
    },
);
// correct url with numeric id
request.put(
    {
        headers: { "content-type": "application/json" },
        url: myurl + "/api/book/1",
        body: JSON.stringify(book1),
    },
    function (error, response, body) {
        console.log(body);
    },
);
// adding another book
request.put(
    {
        headers: { "content-type": "application/json" },
        url: myurl + "/api/book/2",
        body: JSON.stringify(book2),
    },
    function (error, response, body) {
        console.log(body);
    },
);
// correct another object with same year, to test other operation
request.put(
    {
        headers: { "content-type": "application/json" },
        url: myurl + "/api/book/3",
        body: JSON.stringify(book3),
    },
    function (error, response, body) {
        console.log(body);
    },
);

//----------------------Testing GET operation-----------
//Since there is no loan it marks the book as available
request.get(
    {
        headers: { "content-type": "application/json" },
        url: myurl + "/api/book/1",
    },
    function (error, response, body) {
        console.log(body);
    },
);
//-----------------Testing GET operation for all books-----
request.get(
    {
        headers: { "content-type": "application/json" },
        url: myurl + "/api/book/all",
    },
    function (error, response, body) {
        console.log(body);
    },
);
//-------------Testing GET operation based on year
request.get(
    {
        headers: { "content-type": "application/json" },
        url: myurl + "/api/book/year/1999",
    },
    function (error, response, body) {
        console.log(body);
    },
);
