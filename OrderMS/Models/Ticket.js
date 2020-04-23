const mongoose = require('mongoose');

const Ticket = mongoose.model('Ticket', new mongoose.Schema({
    name: { type: String, required: true},
    cost: {type: Number, required: true}
}));

module.exports = Ticket;