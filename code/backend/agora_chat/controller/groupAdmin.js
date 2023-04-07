const { default: axios } = require('axios')
const tokenBuilder = require('../utils/tokens')
const HOST_URL_APP_KEY = require('../utils/hosts')


exports.createGroup = async(req,res)=>{
    const appToken = tokenBuilder.appTokenBuild(50000)
    const name = req.body.groupname ?? null
    const description = req.body.desc ?? 'No description'
    const max_users = req.body.maxusers ?? 50
    const owner = req.body.owner ?? null

    const missingProps = {
        ...(name? {}: {'error':'groupname missing'}),
        ...(owner? {}:{'error':'owner missing'}),
    }
    if(Object.keys(missingProps).length >0)
        return res.status(400).json(missingProps)
    
    //sucsess = {groupid: '<uniq id >'}
    try{
        const groupId = await axios.post(`${HOST_URL_APP_KEY}/chatgroups`,{
            groupname:name,
            desc:description,
            public:false,
            maxusers: max_users,
            owner: owner,
            members: [owner]
        },{
            headers:{
                Authorization: `Bearer ${appToken}`,
                'Content-Type': 'application/json',
                'Accept' : 'application/json'
            }

        })
        const {groupid} = groupId?.data?.data ?? null
        

        if(!groupid)return res.status(404).json('somthing went wrong')

        return res.json({groupid})
    }catch(err){
        return res.status(err?.status ?? 500).json({'errors':err})
    }
}

exports.createGroups = async(req,res)=>{
    const appToken = tokenBuilder.appTokenBuild(50000)
    const name = req.body.groupname 
    const description = req.body.desc || 'No description'
    const max_users = req.body.maxusers || 50
    const owner = req.body.owner

    console.log(name,description,max_users,owner)

    const missingProps = {
        ...(name? {}: {'error':'groupname missing'}),
        ...(owner? {}:{'error':'owner missing'}),
    }
    if(Object.keys(missingProps).length >0)
        return res.status(400).json({'data':missingProps})
    
    
    
    const sides = ['A','B','G']
    const responses = []

    try{

        for(let i=0; i<sides.length; i++){
            const name_side = `${name}_${sides[i]}`

            const groupId = await axios.post(`${HOST_URL_APP_KEY}/chatgroups`,{
                groupname:name_side,
                desc:description,
                public:false,
                maxusers: max_users,
                owner: owner,
                members: [owner]
            },{
                headers:{
                    Authorization: `Bearer ${appToken}`,
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json'
                }
        
            })
            responses.push({[sides[i]]:groupId.data})
        }
        
        return res.json({'AgoraResponse':responses})

    }catch(err){
        return res.status(err?.status ?? 500).json({'errors':err})
    }
}


exports.getGroups = async(req,res)=>{
    const appToken = tokenBuilder.appTokenBuild(3000)


    try{
   

        const groups = await axios.get(`${HOST_URL_APP_KEY}/chatgroups`,{
            headers:{
                Authorization: `Bearer ${appToken}`,
                'Accept' : 'application/json'
            }
        })
        const roomData = groups.data
        return res.json(roomData)

    }catch(err){
        return res.status(err?.status ?? 500).json({'errors':err})
    }

}
exports.getGroupByUser = async(req,res)=>{
    const appToken = tokenBuilder.appTokenBuild(3000)
    const user = req.params.username ?? null

    console.log('in getGroups', user, appToken)

    const misingProps = {
        ...(user ? {} : {'error':'username missing'})
    }
    if(Object.keys(misingProps).length>0)
        return res.status(400).json(misingProps)

    try{

        const group = await axios.get(`${HOST_URL_APP_KEY}/users/${user}/joined_chatgroups`,{
            headers:{
                Authorization: `Bearer ${appToken}`,
                'Accept' : 'application/json'
            }})
        const groupsData = group.data
        return res.json(groupsData)

    }catch(err){
        return res.status(err?.status ?? 500).json({'errors':err})
    }
}

exports.deleteGroup = async(req,res)=>{
    const appToken = tokenBuilder.appTokenBuild(3000)
    const groupId = req.params.chatgroupid ?? null

    const misingProps = {
        ...(groupId? {}: {'error':'chatgroupid is missing'})
    }

    if(Object.keys(misingProps).length>0)
        return res.status(400).json(misingProps)

    try{
        const response = await axios.delete(`${HOST_URL_APP_KEY}/chatgroups/${groupId}`,{},{
            headers:{
                Authorization: `Bearer ${appToken}`,
                'Accept' : 'application/json'
            }
        })
        const ress = response.data
        return res.json(ress)

    }catch(err){
        return res.status(err?.status ?? 500).json({'errors':err})
    }
}

exports.addUserToGroup = async(req,res)=>{
    const appToken = tokenBuilder.appTokenBuild(3000)
    const groupId = req.body.groupId ?? null
    const username = req.body.username ?? null

    const missingProps = {
        ...(groupId? {} : {'error':'groupId missing'}),
        ...(username? {} : {'error':'username missing'})
    }
    if(Object.keys(missingProps).length>0)
        return res.status(400).json(missingProps)

    try{
        const response = await axios.post(`${HOST_URL_APP_KEY}/chatgroups/${groupId}/users/${username}`,{}, {
            headers:{
                Authorization: `Bearer ${appToken}`,
                'Content-Type': 'application/json',
                'Accept' : 'application/json'
            }

        })
        const ress = response.data
        return res.json(ress)

    }catch(err){
        return res.status(err?.status ?? 500).json({'errors':err})
    }

}
exports.addUsersToGroups = async(req,res)=>{
    let users = []
    users = req.body?.users ?? null
    const responses =[]

    

    const missingProps = {
        ...(users? {} : {'error': 'user missing'})
    }
    if(Object.keys(missingProps).length>0)
        return res.status(400).json({'missing properties':missingProps})

    for (let i = 0; i < users.length; i++) {
        try {
            const response = await addSingleUserToGroup(users[i])
            responses.push(response)
        } catch (err) {
            console.log('failer',i)
            return res.status(500).json({ 'error': err.message })
        }
    }
    return res.json({'message':'ok', 'responses':responses})
}

const addSingleUserToGroup =async ({id,groups})=> {
    const appToken = tokenBuilder.appTokenBuild(3000)
    const responses = []

        for (let i = 0; i < groups.length; i++) {
            const groupId = groups[i]
            const response = await axios.post(`${HOST_URL_APP_KEY}/chatgroups/${groupId}/users/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${appToken}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            responses.push(response.data)
        }
        return responses
}

exports.removeUserFromGroup = async(req,res)=>{
    const appToken = tokenBuilder.appTokenBuild(3000)
    const groupId = req.params.groupId ?? null
    const userid = req.params.userid ?? null

    const misingProps = {
        ...(groupId? {} : {'error':'missing groupId'})
    }
    if(Object.keys(misingProps).length>0)
        return res.status(400).json(misingProps)


    try{
        const response = await axios.delete(`${HOST_URL_APP_KEY}/chatgroups/${groupId}/users/${userid}`,{
            headers:{
                Authorization: `Bearer ${appToken}`,
                'Content-Type': 'application/json',
                'Accept' : 'application/json'
            }
        })

        const ress = response.data
        return res.json(ress)

    }catch(err){
        return res.status(err?.status ?? 500).json({'errors':err})
    }

}


