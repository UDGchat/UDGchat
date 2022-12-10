const { createConnections } = require('./create_connections')
const { userSchema } = require('./Schemas/user')
const { groupSchema } = require('./Schemas/group')
const { messageSchema } = require('./Schemas/message')

let db

function getDatabase(){
    if(this.db) return Promise.resolve(db)
    return createModels()
}

function createModels(){
    const {db1, db2} = createConnections(process.env.USERS_DATABASE_URI, process.env.CHATS_DATABASE_URI)
    const UserModel = db1.model('user_info', userSchema)
    const GroupModel = db2.model('group', groupSchema)
    const MessageModel = db2.model('message', messageSchema)
    db = {
        UserModel,
        GroupModel,
        MessageModel
    }
    return db
}

module.exports = { getDatabase }