const moongose = require('mongoose');

const paymentSchema = new moongose.Schema({
    id: {
        type: String
    },
    description: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    phoneIMEI: {
        type: String
    }
})

module.exports = mongoose.model('payment', paymentSchema)