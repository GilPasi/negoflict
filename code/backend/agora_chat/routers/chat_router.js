const express = require('express')
const router = express.Router()


const chatHandler = require('../controller/chat')


router.post('/login',chatHandler.login)


module.exports = router