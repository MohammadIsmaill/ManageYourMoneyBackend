const Payment = require('../models/payments');
const User = require('../models/User');

module.exports.showPayments = async (req, res) => {
    const {payments} = await User.findById(req.user._id).populate('payments')
    res.json(payments);
}

module.exports.createPayment = async (req, res) => {
    const { name, price, date } = req.body;
    const user = await User.findById(req.user._id);
    const payment = new Payment({ name, price, date });
    user.payments.push(payment)
    await Promise.all([await user.save(),await payment.save()])
    res.json(payment)
}

module.exports.updatePayment = async (req, res) => {
    const { name, price, date } = req.body;
    const payment = await Payment.findByIdAndUpdate(req.params.id, { name, price, date });
    res.json(payment)
}
module.exports.deletePayment = async (req, res) => {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    res.json(payment)
}
