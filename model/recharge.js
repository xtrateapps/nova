const moongose = require("mongoose");

const rechargeSchema = new moongose.Schema({
    reference: {
        required: true,
        type: String
    },
    bank: {
        required: true,
        type: String
    },
    cedula: {
        required: true,
        type: String
    },
    phone: {
        required: true,
        type: String
    },
})

module.exports = moongose.model('Recharge', rechargeSchema);