const mongoose = require('mongoose');

const Order = mongoose.model('Order', new mongoose.Schema({
    username: { type: String, required: true},
    wallet: {type: Number},
    ticket_id: {type: String},
    ticket_amount: {type: Number},
    ticket_name: {type: String},
    user_id: {type: String, required: true},
    status: {type: String, required:true}
}));

module.exports = Order;