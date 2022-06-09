require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const ExpressError = require('./utils/ExpressError');
const mongoSanitize = require("express-mongo-sanitize")
const helmet = require("helmet")




const port = process.env.PORT || 5000;


mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
})



app.use(cors())
app.use(express.json())
app.use(mongoSanitize({
    replaceWith:"_"
}))

app.use(helmet());

app.use('/',require('./routes/userRoutes'))
app.use('/payments', require('./routes/paymentRoutes'));
app.use('/debts', require('./routes/debtRoutes'));
app.use('/earnings', require('./routes/earningRoutes'));



app.all('*', (req, res, next) => {
    throw new ExpressError('Route Not Found', 404);
})

app.use((err, req, res, next) => {
    const {statusCode = 500 ,message = 'Something went wrong'} = err
    res.status(statusCode).json({
        message,
        stack:process.env.NODE_ENV === 'production' ? null : err.stack
    })
})


app.listen(port, (req, res) => {
    console.log(`listening on port ${port}`);
});