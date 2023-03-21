const router = require('express').Router()


const groupHandler = require('../controller/groupAdmin')


router.post('/create_group',groupHandler.createGroup)
router.post('/create_groups',groupHandler.createGroups)
router.get('/get_groups',groupHandler.getGroups)
router.get('/get_group_by_user/:username',groupHandler.getGroupByUser)
router.delete('/delete_group/:chatgroupid',groupHandler.deleteGroup)
router.post('/add_user_to_group',groupHandler.addUserToGroup)
router.post('/add_users_to_groups',groupHandler.addUsersToGroups)
router.delete('/remove_member_from_group/:groupId/:userid',groupHandler.removeUserFromGroup)



module.exports = router