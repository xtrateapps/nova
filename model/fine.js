const moongose = require('mongoose')

const fineSchema = new moongose.Schema({
    article: {
        type: String
    },
    plate: {
        type: String
    },
    driverName: {
        type: String
    },
    copName: {
        type: String
    },
    copDni: {
        type: String
    },
    copInteger: {
        type: String
    },
    copPhoneNumber: {
        type: String
    },
    copDeviceNumber: {
        type: String
    },
    copPlateNumber: {
        type: String
    },
    copLeaderPhoneNumber: {
        type: String
    },
    copProfileId: {
        type: String
    },
    copWorkingModule: {
        type: String
    },
    driverDni: {
        type: String
    },
    driverPlatePhoto: {
        type: String
    },
    driverInfrigement: {
        type: String
    },
    fineAmount: {
        type: String
    },
    carModel: {
        type: String
    },
    carYear: {
        type: String
    },
    date: {
        type: Date
    },
    hour: {
        type: Date
    },
    location: {
        type: String
    }
})

module.exports = moongose.model('fine', fineSchema)