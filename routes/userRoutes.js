const express = require('express');
const router = express.Router();
const catchAsync = require('express-async-handler')
const {loginUser,registerUser} = require('../controllers/userControllers');
const { isUserEmailUnique } = require('../middlewares/isUserEmailUnique');
const {validateUser,validateDebt} = require('../middlewares/validateSchema')

router.post('/register', catchAsync(isUserEmailUnique) , validateUser, catchAsync(registerUser))
router.post('/login',catchAsync(loginUser))

module.exports = router