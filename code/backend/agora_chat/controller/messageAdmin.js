const { default: axios } = require('axios')
const tokenBuilder = require('../utils/tokens')
const HOST_URL_APP_KEY = require('../utils/hosts')



exports.oneToOneMessageTxt = async(req,res)=>{
    const userToken = tokenBuilder.userTokenBuild(3000)
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

exports.groupMessage = async(req,res)=>{
    const userToken = tokenBuilder.userTokenBuild(3000)
    const roomid = req.body.chatroomid
    const me = req.body.me
    const msg = req.body.msg

    const mess = await axios.post(`${HOST_URL_APP_KEY}/messages/chatrooms`,{
        from:me,
        to:[roomid],
        type:'txt',
        body:{
            'msg':msg
        }
    },{
        headers:
        {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        }

    })

    return res.json({mess})
}