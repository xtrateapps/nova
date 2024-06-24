const moongose = require("mongoose");

const walletSchema = new moongose.Schema({
    address: {
        required: true,
        type: String
    },
    balance_usdt: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    }
})

module.exports = moongose.model('wallets', walletSchema);