const express = require('express')
const passport = require('passport')
const expressSession = require("express-session")

require('dotenv').config()

const MongoDBStore = require('connect-mongodb-session')(expressSession)
const dbStore = new MongoDBStore({
    uri: process.env.ATLAS_URI,
    databaseName: 'Users',
    collection: 'client_sessions'
})
dbStore.on('error', (err) => {
    console.log('error with database store:', err)
})

const app = express()
const port = process.env.PORT || 5000;

//declara una nueva sesión con express-session
app.use(expressSession({
    secret:[process.env.SESSION_SECRET],
    resave: false,
    saveUninitialized: false,
    cookie: {
        //secure: true,        //for https sites only
        maxAge: 30*60*1000,    // milliseconds of a half hour
    },
    store: dbStore
}));

//serializa los datos del usuario
app.use(passport.initialize());
app.use(passport.session())

app.use(express.json()) //para ser capaces de enviar y recibir .json en las peticiones HTTP

app.use(require('./routes.js'))

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})