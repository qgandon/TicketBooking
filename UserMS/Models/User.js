const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String, required: true},
    wallet: {type: Number, required: true},
    tickets: {type: Array, required:false}
}));

module.exports = User;