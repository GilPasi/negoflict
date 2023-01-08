const { default: axios } = require('axios')
const tokenBuilder = require('../utils/tokens')
const HOST_URL_APP_KEY = require('../utils/hosts')



exports.oneToOneMessageTxt = async(req,res)=>{
    const userToken = tokenBuilder.appTokenBuild(3000)
    const from = req.body.me
    const to = req.body.to
    const msg = req.body.msg
    const type = 'txt'

    
    const mess = await axios.post(`${HOST_URL_APP_KEY}/messages/users`,{
        from: from,
        to: [to],
        type: type,
        body: {"msg": msg}
    },{
        headers:{
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        }
        
    })

    return res.json({mess})

}

exports.roomMessage = async(req,res)=>{
    const appToken = tokenBuilder.appTokenBuild(50000)
    const roomId = req.body.roomid
    const me = req.body.me
    const msg = req.body.msg

    const mess = await axios.post(`${HOST_URL_APP_KEY}/messages/chatrooms`,{
        from:me,
        to:[roomId],
        type:'txt',
        body:{
            'msg':msg
        },
        "routetype":"ROUTE_ONLINE",
        "sync_device":true
    },{
        headers:
        {
            Authorization: `Bearer ${appToken}`,
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        }

    })
    const ress = mess.data
    return res.json(ress)
}


exports.groupMessage = async(req,res)=>{
    const appToken = tokenBuilder.appTokenBuild(50000)
    const groupId = req.body.groupid
    const me = req.body.me
    const msg = req.body.msg

    const mess = await axios.post(`${HOST_URL_APP_KEY}/messages/chatgroups`,{
        from:me,
        to:[groupId],
        type:'txt',
        body:{
            'msg':msg
        },
        "routetype":"ROUTE_ONLINE",
        "sync_device":true
    },{
        headers:
        {
            Authorization: `Bearer ${appToken}`,
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        }

    })
    const ress = mess.data
    return res.json(ress)
}