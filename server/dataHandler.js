const { Snowflake } = require('nodejs-snowflake')

const { getDatabase } = require('./database/get_databases')

async function checkUser(profile, done){
    const uid = new Snowflake()
    const User = await getDatabase().UserModel

    //intenta encontrar un usuario con la misma id que nos devuelve Google
    const currentUser = await User.findOne({ email: profile._json.email })
    
    //si lo encuentra, termina el proceso con la información dada en la autenticación
    if(currentUser){
        done( null, currentUser )
    } else { 
        //si no lo encuentra, crea un nuevo usuario usando el modelo User y los datos que nos dio Google
        new User({
            _id: uid.getUniqueID(),
            username: profile.displayName,
            email: profile._json.email,
            photo: profile._json.picture,
            locale: profile._json.locale,
            epoch: uid.customEpoch()
        // y lo guarda en la base de datos
        }).save().then((newUser) => {
            done(null, newUser)
        })
    }
}


async function sendMessage(author, groupID, subgroupId, message){
    const uid = new Snowflake()
    const Message = await getDatabase().MessageModel
    
    const newMessage = await new Message({
        _id: uid.getUniqueID(),
        groupID: groupID,
        subgroupId: subgroupId,
        author: author,
        body: message,
        epoch: uid.customEpoch()
    }).save()
    return await newMessage
}

async function createGroup(participants){
    const uid = new Snowflake()
    const Group = await getDatabase().GroupModel

    const newGroup = await new Group({
        _id: uid.getUniqueID(),
        participants: participants,
        subgroups: [{
            _id: "0",
            participants: participants
        }],
        epoch: uid.customEpoch()
    }).save()
    return await newGroup
}

module.exports = { checkUser, sendMessage, createGroup }