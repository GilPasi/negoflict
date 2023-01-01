const router = require('express').Router()



const AuthHandler = require('../controller/authAdmin')
const UserHandler = require('../controller/userAdmin')


router.get('get_token/:uid',AuthHandler.getUserToken)
router.get('/get_token',AuthHandler.getAppToken)
router.post('/register_user',UserHandler.registerUser)
router.post('/delete_user',UserHandler.deleteUser)



module.exports = router