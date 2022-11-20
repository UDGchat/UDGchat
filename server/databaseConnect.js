import mongoose from 'mongoose'
import dotenv from "dotenv"
dotenv.config()

//establece la URI para la conexión con ATLAS
const uri = process.env.ATLAS_URI

//mongoose se conecta a la URI, conexión permitida porque mi IP esta permitida
mongoose.connect(uri, {})

//guarda el estado de la conexión a la base de datos
const connection = mongoose.connection

//cuando esta conectada, manda el mensaje
connection.once('open', () =>
    console.log('Connection to MongoDB successful')
)

//crea un nuevo esquema para la colección 'user_info' de la base de datos
const user_info = new mongoose.Schema({
    googleId: String,
    username: String,
})

//crea un nuevo modelo de la colección 'user_info' basado en el esquema del mismo nombre
const User = mongoose.model('user_info', user_info)

export default User