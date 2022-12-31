const {RtcTokenBuilder, RtcRole} = require('agora-access-token')
const APP_ID = process.env.APP_ID
const APP_CERTIFICATE = process.env.APP_CERTIFICATE 


exports.nocache = (req,res, next)=>{
    res.header('Cache-Control','private, no-cache, no-store, must-revalidate')
    res.header('Expires','-1')
    res.header('Pragma','no-cache')
    next()
}


exports.generatedAccessToken = (req,res)=>{
    res.header('ACESS-Control-Allow-Origin','*')

    const channelName = req.query.channelName //channel name
    if(!channelName){
        return res.status(500).json({'error': 'channel is required'})
    }

    let uid = req.query.uid // user id
    if(!uid|| uid=== '')
        uid=0

    let role = RtcRole.SUBSCRIBER 
    if(req.query.role === 'publisher')
        role = RtcRole.PUBLISHER

    let expireTime = req.query.expireTimeif
    if(!expireTime|| expireTime==='')
        expireTime = 3600
    else
        expireTime = parseInt(expireTime, 10)

    const currentTime = Math.floor(Date.now()/1000)
    const privilegeExpireTime = currentTime+ expireTime

    const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, uid, role, privilegeExpireTime)

    return res.json({'token':token})
   
}
