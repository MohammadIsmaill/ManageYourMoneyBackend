const User = require('../models/User')
const Earning = require('../models/earnings')

module.exports.showEarnings = async (req, res) => {
    const {earnings} = await User.findById(req.user._id).populate('earnings')
    res.json(earnings)
}

module.exports.createEarning = async (req, res) => {
    const {name,price,date} =req.body;
    const user = await User.findById(req.user._id)
    const earning = new Earning({name,price,date})
    user.earnings.push(earning)
    await Promise.all([await user.save(),await earning.save()])
    res.json(earning)
}

module.exports.updateEarning = async (req,res)=>{
    const { name, price, date } = req.body;
    const earning = await Earning.findByIdAndUpdate(req.params.id, { name, price, date });
    res.json(earning)
}

module.exports.deleteEarning = async (req, res) => {
    const earning = await Earning.findByIdAndDelete(req.params.id);
    res.json(earning);
}