const moongose = require("mongoose");

const consoleSchema = new moongose.Schema({
    name: {
        required: true,
        type: String
    },
    company: {
        required: true,
        type: String
    },
    year: {
        required: true,
        type: String
    }
})

module.exports = moongose.model('Console', consoleSchema);