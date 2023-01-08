const { default: axios } = require('axios')
const tokenBuilder = require('../utils/tokens')
const HOST_URL_APP_KEY = require('../utils/hosts')




exports.registerUser = async(req,res)=>{
    const appToken = tokenBuilder.appTokenBuild(3000)
    const uid = req.body.uid
    const password = req.body.password
    const username = req.body.username
    

    const user = await axios.post(`${HOST_URL_APP_KEY}/users`,{
    username:uid,
    password: password,
    nickname: username
    },{
        headers:{
            Authorization: `Bearer ${appToken}`,
            'Content-Type': 'application/json'
    },
    }).then(user=>console.log(user))
    .catch(err=>console.log(err))
    return res.json({user})
}

exports.deleteUser = async(req,res) =>{
    
    const appToken = tokenBuilder.appTokenBuild(3000)
    const username = req.params.userid

    const request = await axios.delete(`${HOST_URL_APP_KEY}/users/${username}`,{
        headers:{
            Authorization: `Bearer ${appToken}`,
            'Accept' : 'application/json'
        }
    })
    .then(user=>console.log(user))
    .catch(err=>console.log(err))

    
    return res.json({request})
}