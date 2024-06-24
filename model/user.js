const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        required: false,
        type: String
    },
    clave: {
        required: false,
        type: String
    },
    username: {
        required: false,
        type: String
    },
    passphrase: {
        required: false,
        type: String
    },
    wallet: {
        required: false,
        type: String
    },
    balance: {
        required: false,
        type: String
    },
    cedula: {
        required: false,
        type: String
    },
    direccion: {
        required: false,
        type: String
    },
    avatar: {
        required: false,
        type: String
    },
    pin: {
        required: false,
        type: String
    },
    preguntas: {
        required: false,
        type: String
    },
    email: {
        required: false,
        type: String
    },
    created: {
        required: false,
        type: String
    }
})
module.exports = mongoose.model('User', userSchema)