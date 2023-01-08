const { default: axios } = require('axios')
const tokenBuilder = require('../utils/tokens')
const HOST_URL_APP_KEY = require('../utils/hosts')


exports.createRoom = async(req,res)=>{
    const appToken = tokenBuilder.appTokenBuild(3000)
    const name = req.body.chatname
    const description = req.body.description
    const max_users = req.body.max_users
    const owner = req.body.owner

    const chatId = await axios.post(`${HOST_URL_APP_KEY}/chatrooms`,{
        name:name,
        description:description,
        maxusers: max_users,
        owner: owner,
        members: [owner]
    },{
        headers:{
            Authorization: `Bearer ${appToken}`,
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        }

    })
    const id = chatId.data.data.id
    return res.json({id})
}

exports.getRooms = async(req,res)=>{
    const appToken = tokenBuilder.appTokenBuild(3000)
   

    const rooms = await axios.get(`${HOST_URL_APP_KEY}/chatrooms`,{
        headers:{
            Authorization: `Bearer ${appToken}`,
            'Accept' : 'application/json'
        }
    })
    const getAllRooms = rooms.data
   return res.json({getAllRooms})

}
exports.getRoomByUser = async(req,res)=>{
    const appToken = tokenBuilder.appTokenBuild(3000)
    const user = req.params.username

    const room = await axios.get(`${HOST_URL_APP_KEY}/users/${user}/joined_chatrooms`,{
        headers:{
            Authorization: `Bearer ${appToken}`,
            'Accept' : 'application/json'
        }
    })
    const userRooms = room.data
    return res.json({userRooms})
}
exports.getRoomById = async(req,res)=>{
    const appToken = tokenBuilder.appTokenBuild(3000)
    const roomid = req.params.chatroomid

    const room = await axios.get(`${HOST_URL_APP_KEY}/chatrooms/${roomid}`,{
        headers:
        {
            Authorization: `Bearer ${appToken}`,
            'Accept' : 'application/json'

        }
    })
    const getRoomID = room.data
    return res.json({getRoomID})
}

exports.deleteRoom = async(req,res)=>{
    const appToken = tokenBuilder.appTokenBuild(3000)
    const roomid = req.params.chatroomid


    const response = await axios.delete(`${HOST_URL_APP_KEY}/chatrooms/${roomid}`,{
        headers:{
            Authorization: `Bearer ${appToken}`,
            'Accept' : 'application/json'
        }
    })
    const deleteRoombyID = response.data
    return res.json({deleteRoombyID})
}

exports.addUserToRoom = async(req,res)=>{
    const appToken = tokenBuilder.appTokenBuild(3000)
    const chatId = req.body.chatroomid
    const username = req.body.username

    const response = await axios.post(`${HOST_URL_APP_KEY}/chatrooms/${chatId}/users/${username}`,{},{
        headers:{
            Authorization: `Bearer ${appToken}`,
            'Content-Type': 'application/json',
            'Accept' : 'application/json'

        }

    })
    const addUserRoom = response.data
    return res.json({addUserRoom})

}
exports.removeFromChatroom = async(req,res)=>{
    const appToken = tokenBuilder.appTokenBuild(3000)
    const roomid = req.params.chatroomid
    const userid = req.params.userid


    const response = await axios.delete(`${HOST_URL_APP_KEY}/chatrooms/${roomid}/users/${userid}`,{
        headers:{
            Authorization: `Bearer ${appToken}`,
            'Accept' : 'application/json'
        }
    })

    const deleteFromRoom = response.data
    return res.json({deleteFromRoom})

}


