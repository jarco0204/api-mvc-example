import express from "express";

//Main app for express API
const app = express();
const port = 3000;

//Main route
app.get("/", (req, res) => {
    res.send("Hello world");
});

//Listening to request
export const start = () => {
    app.listen(3000, () => {
        console.log("server is started");
    });
};
