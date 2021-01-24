const express = require("express");
const loan = require("../controllers/LoanController");
const router = express.Router(); //Used to handle routes using controllers

// route: /api/loan/:id
router.route("/").put(loan.addController);

module.exports = router;
