const Debt = require('../models/debts');
const User = require('../models/User');

module.exports.showDebts = async (req, res) => {
    const {debts} = await User.findById(req.user._id).populate('debts')
    res.json(debts)
}

module.exports.createDebt = async (req, res) => {
    const user = await User.findById(req.user._id)
    const { name, price, date } = req.body;
    const debt = new Debt({ name, price, date });
    user.debts.push(debt)
    await Promise.all([await user.save(),await debt.save()])
    res.json(debt)
}



module.exports.updateDebt = async (req, res) => {
    const { name, price, date } = req.body;
    const debt = await Debt.findByIdAndUpdate(req.params.id, { name, price, date });
    res.json(debt)
}

module.exports.deleteDebt = async (req, res) => {
    const debt = await Debt.findByIdAndDelete(req.params.id);
    res.json(debt)
}


