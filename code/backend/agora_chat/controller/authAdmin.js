
const tokenBuilder = require('../utils/tokens')



exports.getAppToken = (req,res)=>{
   const token= tokenBuilder.appTokenBuild(3000)
   return res.json({'appToken':token})
}

exports.getUserToken = (req,res)=>{
    const userUuid = req.params.uid
    const token = tokenBuilder.userTokenBuild(userUuid,5000000)
    return res.json({'userToken':token})
}



