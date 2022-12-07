const express = require('express')
const router = express.Router()
const cors = require('cors')
const passport = require('passport')

require('./oauth.js')
//importa el código de oauth.js y lo ejecuta

const app = express()

app.use(cors())
const corsOptions = {
    origin: `${process.env.SERVER_URL}:3000`,
    credentials: true
}

router.get("/auth/google", cors(corsOptions), passport.authenticate("google", {
    scope: ["profile", "email"]
  }));
  
router.get("/", passport.authenticate('google'), (req, res) => {
    res.redirect(`${process.env.SERVER_URL}:3000/home`)
});

router.get("/user", cors(corsOptions), (req, res) => {
    let currentSession =  { user: req.user, auth: req.isAuthenticated() }
    res.send( currentSession )
})

router.get("/logout", (req, res, next) => {
    req.session.destroy((err) => {
        if (err) { return next(err) }
    });
})

module.exports = router