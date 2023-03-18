const { default: axios } = require('axios')
const tokenBuilder = require('../utils/tokens')
const HOST_URL_APP_KEY = require('../utils/hosts')

exports.registerUsers = async(req,res)=>{
    const appToken = tokenBuilder.appTokenBuild(3000)
    const users = req.body.users
    const access = req.body.access

    let registeredUsers = []

    for(let i=0; i<users.length; i++){
        const tempUid = users[i].uid.toString()
        const password = users[i].password
        const username = users[i].username

        const uid = tempUid.replace(/-/g, "")

        const user = await axios.post(`${HOST_URL_APP_KEY}/users`,{
            username:uid,
            password: password,
            nickname: username
        },{
            headers:{
                Authorization: `Bearer ${appToken}`,
                'Content-Type': 'application/json'
            },
        }).then(user=>user)
        .catch(err=>console.log(err))

        registeredUsers.push(user.data)
    }

    const createUsersRequest = await axios.post('http://localhost:8000/user_view/create_users/', users,{
        headers:{
            Authorization: `JWT ${access}`
        }
    })
    .then(response => response)
    .catch(err => console.log(err))

    return res.json({users: registeredUsers, dbResult: createUsersRequest.data})
}



exports.registerUser = async(req,res)=>{
    const appToken = tokenBuilder.appTokenBuild(3000)
    const tempUid = req.body.uid.toString()
    const password = req.body.password
    const username = req.body.username

    const uid = tempUid.replace(/-/g, "")

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