const {Schema} = require('mongoose')

const messageSchema = new Schema({
    _id: String,
    groupID: String,
    subgroupID: String,
    author: { type: String, ref: 'User' },
    body: { type: String, default: "" },
    epoch: Number
})

module.exports = { messageSchema }