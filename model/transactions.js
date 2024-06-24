const moongose = require("mongoose");

const transactionSchema = new moongose.Schema({
    wallet_sender: {
        required: true,
        type: String
    },
    wallet_receiver: {
        required: true,
        type: String
    },
    comments: {
        required: true,
        type: String
    },
    reference: {
        required: true,
        type: String
    },
    date: {
        required: true,
        type: String
    },
    payment_number: {
        required: true,
        type: String
    },
    bank: {
        required: true,
        type: String
    },
    account_number: {
        required: true,
        type: String
    },
    amount: {
        required: true,
        type: String
    },
    identificator: {
        required: true,
        type: String
    },

})

module.exports = moongose.model('Transaction', transactionSchema);