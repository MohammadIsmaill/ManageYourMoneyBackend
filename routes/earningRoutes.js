const express = require("express");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const router = express.Router();
const earning = require("../controllers/earningControllers");
const catchAsync = require('express-async-handler');
const { validateEarning } = require("../middlewares/validateSchema");
router
  .route("/")
  .get(catchAsync(isLoggedIn), catchAsync(earning.showEarnings))
  .post(catchAsync(isLoggedIn), validateEarning, catchAsync(earning.createEarning));

router
  .route("/:id")
  .put(catchAsync(isLoggedIn), catchAsync(earning.updateEarning))
  .delete(catchAsync(isLoggedIn),catchAsync(earning.deleteEarning));

module.exports = router;
