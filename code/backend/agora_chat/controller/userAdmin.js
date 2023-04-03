const { default: axios } = require('axios')
const tokenBuilder = require('../utils/tokens')
const HOST_URL_APP_KEY = require('../utils/hosts')

exports.registerUsers = async(req,res)=>{
    const appToken = tokenBuilder.appTokenBuild(3000)
    const users = req.body.users ?? null
    const access = req.body.access ?? null
    const caseId = req.body.caseId ?? null

    const misingProps = {
        ...(users? {} : {'error':'users missing'}),
        ...(access? {} : {'error':'access Token missing'}),
        ...(caseId? {} : {'erorr':'case id missing'})
    }
    if(Object.keys(misingProps).length>0){
        console.log('missing params')
        return res.status(500).json(misingProps)
    }



    let registeredUsers = []
    
   
        for(let i=0; i<users.length; i++){
            if(!users[i].username || !users[i].password || !users[i].first_name){
                deleteCase_local(caseId)
                deleteUserHelper(registeredUsers)
                console.log('user not gooodd')
                return res.status(500).json({'erorrs':'mising username'})

            }
              

            const tempUid = users[i].username.toString().replace(/[^\w\s]/gi, '');
            const password = users[i].password
            const username = users[i].first_name

            // const uid = tempUid.replace(/-/g, "")
            try{
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

            }catch(err){
                deleteUserHelper(registeredUsers)
                deleteCase_local(caseId)
                console.log('agora eror')
                return res.status(500).json({'erorrs':err})
            } 
        }
    try{

        const createUsersRequest = await axios.post(`${process.env.SERVER_URL}/users/user_view/create_users/`, users,{
            headers:{
                Authorization: `JWT ${access}`
            }
        })
        
        return res.json({'users': registeredUsers, 'dbResult': createUsersRequest.data})

    }catch(err){
        console.log('server eror')
        deleteUserHelper(registeredUsers)
     
        deleteCase_local(caseId)

        return res.status(500).json({'erorrs':err, 'case':caseId})
    }
    
}
const deleteUserHelper = (array)=>{
    array.forEach(user=>{
        const username =user.entities[0].username
        deleteUser_local(username)
       
    })

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
    const username = req.params.userid ?? null

    if(!username)
        return res.status(400).json({'erorr':'username missing'})
    try{
        const request = await axios.delete(`${HOST_URL_APP_KEY}/users/${username}`,{
            headers:{
                Authorization: `Bearer ${appToken}`,
                'Accept' : 'application/json'
            }
        })
        return res.json({request})
    }catch(err){
        return res.status(err?.status ?? 500).json({'erorr':err})
    }
}

const deleteUser_local = async(username) =>{
    const appToken = tokenBuilder.appTokenBuild(3000)

        if(!username)
        return res.status(400).json({'erorr':'username missing'})
    try{
         await axios.delete(`${HOST_URL_APP_KEY}/users/${username}`,{
            headers:{
                Authorization: `Bearer ${appToken}`,
                'Accept' : 'application/json'
            }
        })
       
        
        return 
    }catch(err){
        return
    }

}

const deleteCase_local = async(caseId)=>{
    const res =await axios.delete(`${process.env.SERVER_URL}/session/case/delete_case/?caseId=${caseId}`)//add crdential
    return res

}