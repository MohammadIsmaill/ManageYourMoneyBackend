const express = require("express");
const payment = require("../controllers/paymentControllers");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const {validatePayment} = require("../middlewares/validateSchema")
const catchAsync = require('express-async-handler')
const router = express.Router();

router
  .route("/")
  .get(catchAsync(isLoggedIn), catchAsync(payment.showPayments))
  .post(catchAsync(isLoggedIn), validatePayment,catchAsync(payment.createPayment));
router
  .route("/:id")
  .put(catchAsync(isLoggedIn), catchAsync(payment.updatePayment))
  .delete(catchAsync(isLoggedIn),catchAsync(payment.deletePayment));

module.exports = router;
