
const AC = require('agora-chat')
const {axios} = require('axios')

const conn = new  AC.default.connection({
    appKey: process.env.APP_ID
})

exports.login = async (req,res)=>{
    const channelName = req.body.channelName
    const userId = req.body.userId
    
    const token = await axios.get(`http://localhost:8050//access_token?channelName=${channelName}&uid=${userId}`)

    conn.open({
        user: userId,
        agoraToken: token
    })
}