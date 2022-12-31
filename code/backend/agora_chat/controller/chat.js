const {  default: axios } = require('axios')
const AC = require('agora-chat').default
const browserEnv = require('browser-env')

browserEnv(['navigator'])







exports.login = async (req,res)=>{

    const channelName = 'test'
    const userId = '1'


    const token = await axios.get(`http://localhost:8050/access_token?channelName=${channelName}&uid=${userId}`)

    console.log(token.data.token)

    const conn = new AC.connection({
        appKey:`${process.env.ORG_NAME}#${process.env.APP_NAME}`
    })

    conn.open({
        user:userId,
        accessToken:token.data.token
    })
    
}