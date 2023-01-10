const router = require('express').Router()


const groupHandler = require('../controller/groupAdmin')


router.post('/create_group',groupHandler.createGroup)
router.get('/get_groups',groupHandler.getGroups)
router.get('/get_group_by_user/:username',groupHandler.getGroupByUser)
router.delete('/delete_group/:chatgroupid',groupHandler.deleteGroup)
router.post('/add_user_to_group',groupHandler.addUserToGroup)
router.delete('/remove_member_from_group/:groupId/:userid',groupHandler.removeUserFromGroup)



module.exports = router