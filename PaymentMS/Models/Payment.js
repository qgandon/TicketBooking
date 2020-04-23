const mongoose = require('mongoose');

const Payment = mongoose.model('Payment', new mongoose.Schema({
    userId: { type: String, required: true},
    userWallet: {type: Number, required: true},
    ticketCost: {type: Number, required:true},
    ticketName: {type: String, required: true},
    createdAt: {type: String, required: false}
}));

module.exports = Payment;