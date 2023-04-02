const { default: axios } = require('axios')
const tokenBuilder = require('../utils/tokens')
const HOST_URL_APP_KEY = require('../utils/hosts')

exports.registerUsers = async(req,res)=>{
    const appToken = tokenBuilder.appTokenBuild(3000)
    const users = req.body.users ?? null
    const access = req.body.access ?? null

    const misingProps = {
        ...(users? {} : {'error':'users missing'}),
        ...(access? {} : {'error': 'access Token missing'})
    }
    if(Object.keys(misingProps).length>0)
        return res.status(500).json(misingProps)



    let registeredUsers = []
    let erorrs = []
    try{
        for(let i=0; i<users.length; i++){
            const tempUid = users[i].username.toString().replace(/[^\w\s]/gi, '');
            const password = users[i].password
            const username = users[i].first_name

            // const uid = tempUid.replace(/-/g, "")

            const user = await axios.post(`${HOST_URL_APP_KEY}/users`,{
                username: tempUid,
                password: password,
                nickname: username
            },{
                headers:{
                    Authorization: `Bearer ${appToken}`,
                    'Content-Type': 'application/json'
                },
            })

            registeredUsers.push(user.data)
        }
    }catch(err){
        erorrs.push({'agora_erorr':err})
    }

    if(erorrs.length>0)
        return res.status(500).json({'erorrs':erorrs})

    try{

        const createUsersRequest = await axios.post(`${process.env.SERVER_URL}/users/user_view/create_users/`, users,{
            headers:{
                Authorization: `JWT ${access}`
            }
        })
        return res.json({'users': registeredUsers, 'dbResult': createUsersRequest.data})

    }catch(err){
        return res.status(err?.status ?? 500).json({'errors':err})
    }
    

    
    // return res.json({'dbResult': createUsersRequest.data})
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

const deleteUser_local = async(username) =>{
    const appToken = tokenBuilder.appTokenBuild(3000)

    const request = await axios.delete(`${HOST_URL_APP_KEY}/users/${username}`,{
        headers:{
            Authorization: `Bearer ${appToken}`,
            'Accept' : 'application/json'
        }
    })
    return request.data

}