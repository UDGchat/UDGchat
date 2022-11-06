const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {})
const connection = mongoose.connection
connection.once('open', () =>
    console.log('Connection to MongoDB successful')
)

app.use(cors())
app.use(express.json())

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})