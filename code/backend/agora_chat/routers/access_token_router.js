const express = require('express')
const router = express.Router()


const access_tokenController = require('../controller/access_token_controller')


router.get('/access_token', access_tokenController.nocache,access_tokenController.generatedAccessToken)


module.exports = router