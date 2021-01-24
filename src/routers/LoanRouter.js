const express = require("express");
const loan = require("../controllers/LoanController");
const router = express.Router(); //Used to handle routes using controllers

// route: /api/loan/:id
// PUT for adding individual loan
// POST for updating individual loan
router.route("/:id").put(loan.addController).post(loan.updateController);

// route: /api/loan/open
// GET to retrieve all the loans that are open, or set returned to false
router.route("/open").get(loan.getActiveController);

// route: /api/loan/finished
// GET to retrieve all the loans are finished, or set returned to true
router.route("/finished").get(loan.getFinishedController);

module.exports = router;
