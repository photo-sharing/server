const mongoose = require('mongoose')

const photoSchema = new mongoose.Schema({
    url: String,
    description: {
        type: String,
        required: true
    },
    reported: {
        type : Number,
        default : 0
    },
    tags: []
}, {
    timestamps: true
})

const Photo = mongoose.model('Photo', photoSchema)

module.exports = Photo