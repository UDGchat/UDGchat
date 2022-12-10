const express = require('express')
const cors = require('cors')
const passport = require('passport')
const expressSession = require("express-session")
const bodyParser = require("body-parser")

require('dotenv').config()

const MongoDBStore = require('connect-mongodb-session')(expressSession)
const dbStore = new MongoDBStore({
    uri: process.env.USERS_DATABASE_URI,
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
        maxAge: 60*60*1000,    // milliseconds of an hour
    },
    store: dbStore
}));

//serializa los datos del usuario
app.use(passport.initialize());
app.use(passport.session())

app.use(express.json()) //para ser capaces de enviar y recibir .json en las peticiones HTTP
app.use(bodyParser.json())

app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_ENDPOINT);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin');
    res.setHeader('Access-Control-Allow-Credentials', true)
      return res.sendStatus(200);
    }
    next();
});

app.use(cors({
    origin: process.env.CLIENT_ENDPOINT,
    credentials: true,
}))

app.use(require('./routes.js')) // monta las rutas

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})