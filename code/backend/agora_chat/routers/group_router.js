const router = require('express').Router()


const roomHandler = require('../controller/roomAdmin')


router.post('/create_room',roomHandler.createRoom)//create new room
router.get('/get_rooms/:chatroomid',roomHandler.getRoomById)//get room by id
router.get('/get_rooms',roomHandler.getRooms)//get all rooms
router.get('/get_room_by_user/:username',roomHandler.getRoomByUser)//get detail of room by user
router.delete('/delete_room/:chatroomid',roomHandler.deleteRoom)
router.post('/add_user_to_chat',roomHandler.addUserToRoom)
router.delete('/remove_member_from_chat/:chatroomid/:userid',roomHandler.removeFromChatroom)



module.exports = router