const {Schema} = require('mongoose')

//crea un nuevo esquema para la colección 'user_infos' de la base de datos
//mongoose busca automaticamente el nombre en plural que pongamos para la colección, ¯\_(ツ)_/¯
const userSchema = new Schema({
    _id: { type: String, required: true },
    username: String,
    email: String,
    photo: String,
    locale: String,
    epoch: Number
})

module.exports = { userSchema }