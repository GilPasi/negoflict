const router = require('express').Router()



const AuthHandler = require('../controller/authAdmin')
const UserHandler = require('../controller/userAdmin')


router.get('/get_token/:uid',AuthHandler.getUserToken)
router.get('/get_token',AuthHandler.getAppToken)

router.post('/register_user',UserHandler.registerUser)
router.delete('/delete_user/:userid',UserHandler.deleteUser)



module.exports = router