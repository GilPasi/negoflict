const {ChatTokenBuilder} = require('../auth/chat_token_builder')



const appTokenBuild = expireTime =>{
    return ChatTokenBuilder.buildAppToken(process.env.APP_ID,process.env.APP_CERTIFICATE,expireTime)

}
const userTokenBuild = (uid,expireTime) =>{
    return ChatTokenBuilder.buildUserToken(process.env.APP_ID,process.env.APP_CERTIFICATE,uid,expireTime)

}

module.exports = {appTokenBuild,userTokenBuild}