const express = require('express')
const passport = require('passport')

require('./oauth.js')
const { sendMessage } = require('./dataHandler')

const router = express.Router()

router.post("/send", async (req, res) => {
    const { groupID, subgroupID, message } = req.body
    const author = req.user.username

    const sentMessage = await sendMessage(author, groupID, subgroupID, message)
    res.send(sentMessage)
})

router.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"]
  }));
  
router.get("/", passport.authenticate('google'), (req, res) => {
    res.redirect(`${process.env.CLIENT_ENDPOINT}/home`)
});

router.get("/user", (req, res) => {
    try{
        let currentSession =  { 
            user: req.user, 
            auth: req.isAuthenticated()
        }
        res.send( currentSession )
    } catch(error) {
        res.send(error)
    }
})

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err) }
    })
    res.redirect(`${process.env.CLIENT_ENDPOINT}/login`)
})

module.exports = router