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
