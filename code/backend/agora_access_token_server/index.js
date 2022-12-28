const express = require('express')
const {RtcTokenBuilder, RtcRole} = require('agora-access-token')



const PORT = 8050

// const APP_ID = process.env.APP_ID
// const APP_CERTIFICATE = process.env.APP_CERTIFICATE

const APP_ID = '72cdfd7230074a3dab0aa78408a9ccac'
const APP_CERTIFICATE = '236073be429a4229b3108522c545e5e3'



const app = express()

const nocache = (req,res, next)=>{
    res.header('Cache-Control','private, no-cache, no-store, must-revalidate')
    res.header('Expires','-1')
    res.header('Pragma','no-cache')
    next()
}

const generatedAccessToken = (req,res)=>{
    res.header('ACESS-Control-Allow-Origin','*')

    const channelName = req.query.channelName
    if(!channelName){
        return res.status(500).json({'error': 'channel is required'})
    }

    let uid = req.query.uid
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

app.get('/access_token', nocache, generatedAccessToken)

app.listen(PORT, ()=>{
    console.log(`listeninig on port:${PORT}`)
})