import mongoose from 'mongoose'
import dotenv from "dotenv"
dotenv.config()

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {})
const connection = mongoose.connection
connection.once('open', () =>
    console.log('Connection to MongoDB successful')
)