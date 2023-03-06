const { default: axios } = require('axios')
const tokenBuilder = require('../utils/tokens')
const HOST_URL_APP_KEY = require('../utils/hosts')


exports.registerUser = async(req,res)=>{
    const appToken = tokenBuilder.appTokenBuild(3000)
    const access = req.body.access
    const password = req.body.password
    const username = req.body.username

    

    const response = await axios.post(`${process.env.SERVER_URL}/session/chat_users/`,{},{
        headers:{
            origin:'*',
        }
    })
    .catch(err=>console.log(err))
    console.log(response.data.chat_user_id)

    const uid_response = response.data.chat_user_id.toString()
    const uid = uid_response.replace(/-/g, "")
    
    

    const user = await axios.post(`${HOST_URL_APP_KEY}/users`,{
    username:uid,
    password: password,
    nickname: username
    },{
        headers:{
            Authorization: `Bearer ${appToken}`,
            'Content-Type': 'application/json'
    },
    })
    .catch(err=>console.log(err))
    .then(()=>console.log('success'))

    await axios.put(`${process.env.SERVER_URL}/session/chat_users/${uid_response}/`,{
        nickname: username,
        password:password,
    },{
        headers:{
            Authorization: `JWT ${access}`
        }
            
    },[])
    .catch(err=>console.log(err))
    .then(()=>console.log('sucsess'))

    
    
    
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