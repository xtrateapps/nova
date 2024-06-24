const moongose = require("mongoose");

const gameSchema = new moongose.Schema({
    title: {
        required: true,
        type: String
    },
    image: {
        required: true,
        type: String
    },

});

module.exports = moongose.model('Game', gameSchema)