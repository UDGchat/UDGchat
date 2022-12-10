const {Schema} = require('mongoose')

const groupSchema = new Schema({
    _id: String,
    participants: [{
        _id: String,
        lastMessage: Date
    }],
    subgroups: [{
        _id: String,
        participants: [{
            _id: String
        }]
    }],
    epoch: Number
}, {timestamps: true})

module.exports = { groupSchema }