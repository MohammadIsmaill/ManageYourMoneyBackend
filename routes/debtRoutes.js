const express = require("express");
const debt = require("../controllers/debtControllers");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const { validateDebt }  = require("../middlewares/validateSchema");
const catchAsync = require('express-async-handler')
const router = express.Router();

router
  .route("/")
  .get(catchAsync(isLoggedIn),catchAsync(debt.showDebts))
  .post( catchAsync(isLoggedIn), validateDebt, catchAsync(debt.createDebt));
router
  .route("/:id")
  .put(catchAsync(isLoggedIn), catchAsync(debt.updateDebt))
  .delete(catchAsync(isLoggedIn), catchAsync(debt.deleteDebt));

module.exports = router;
