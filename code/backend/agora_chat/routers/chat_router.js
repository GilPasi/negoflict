const router = require('express').Router()

const messageHandler = require('../controller/messageAdmin')

router.post('/one_to_one_message',messageHandler.oneToOneMessageTxt)
router.post('/group_message',messageHandler.groupMessage)




module.exports = router