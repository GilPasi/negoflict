// const { default: axios } = require('axios')
// const tokenBuilder = require('../utils/tokens')
// const HOST_URL_APP_KEY = require('../utils/hosts')


// exports.createRoom = async(req,res)=>{
//     const appToken = tokenBuilder.appTokenBuild(3000)
//     const name = req.body.groupname
//     const description = req.body.desc
//     const max_users = req.body.maxusers
//     const owner = req.body.owner

//     const groupId = await axios.post(`${HOST_URL_APP_KEY}/chatgroups`,{
//         groupname:name,
//         desc:description,
//         public:false,
//         maxusers: max_users,
//         owner: owner,
//         members: [owner]
//     },{
//         headers:{
//             Authorization: `Bearer ${appToken}`,
//             'Content-Type': 'application/json',
//             'Accept' : 'application/json'
//         }

//     })
//     const id = chatId.data.data.id
//     res.json({id})
// }

// exports.getRooms = async(req,res)=>{
//     const appToken = tokenBuilder.appTokenBuild(3000)
   

//     const rooms = await axios.get(`${HOST_URL_APP_KEY}/chatrooms`,{
//         headers:{
//             Authorization: `Bearer ${appToken}`,
//             'Accept' : 'application/json'
//         }
//     })

//    return res.json({rooms})

// }
// exports.getRoomByUser = async(req,res)=>{
//     const appToken = tokenBuilder.appTokenBuild(3000)
//     const user = req.query.username

//     const room = await axios.get(`${HOST_URL_APP_KEY}/users/${user}/joind_chatrooms`,{
//         headers:{
//             Authorization: `Bearer ${appToken}`,
//             'Accept' : 'application/json'
//         }
//     })

//     return res.json({room})
// }
// exports.getRoomById = async(req,res)=>{
//     const appToken = tokenBuilder.appTokenBuild(3000)
//     const roomid = req.query.chatroomid

//     const room = await axios.get(`${HOST_URL_APP_KEY}/chatrooms/${roomid}`,{
//         headers:
//         {
//             Authorization: `Bearer ${appToken}`,
//             'Accept' : 'application/json'

//         }
//     })

//     return res.json({room})
// }

// exports.deleteRoom = async(req,res)=>{
//     const appToken = tokenBuilder.appTokenBuild(3000)
//     const roomid = req.query.chatroomid


//     const response = await axios.delete(`${HOST_URL_APP_KEY}/chatrooms/${roomid}`,{
//         headers:{
//             Authorization: `Bearer ${appToken}`,
//             'Accept' : 'application/json'
//         }
//     })

//     return res.json({response})
// }

// exports.addUserToRoom = async(req,res)=>{
//     const appToken = tokenBuilder.appTokenBuild(3000)
//     const chatId = req.body.chatroomid
//     const username = req.body.username

//     const response = await axios.post(`${HOST_URL_APP_KEY}/chatrooms/${chatId}/${username}`,{
//         headers:{
//             Authorization: `Bearer ${appToken}`,
//             'Content-Type': 'application/json',
//             'Accept' : 'application/json'

//         }

//     })

//     return res.json({response})

// }
// exports.removeFromChatroom = async(req,res)=>{
//     const appToken = tokenBuilder.appTokenBuild(3000)
//     const roomid = req.query.chatroomid
//     const userid = req.query.userid


//     const response = await axios.delete(`${HOST_URL_APP_KEY}/chatrooms/${chatId}/users/${userid}`)


//     return res.json({response})

// }


