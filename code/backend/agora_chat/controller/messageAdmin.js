const { default: axios } = require('axios')
const tokenBuilder = require('../utils/tokens')
const HOST_URL_APP_KEY = require('../utils/hosts')



exports.oneToOneMessage = async(req,res)=>{
    const userToken = tokenBuilder.userTokenBuild(3000)
    const from = req.body.me
    const to = req.body.to
    const message = req.body.message
    const type = req.body.type

    //type = txt

    await axios.post(`${HOST_URL_APP_KEY}/messages/users`,{
        from: from,
        to: [to],
        type: type,
        body: {"msg": message}
    },{
        headers:{
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        }
        
    })

}