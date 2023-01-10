const { default: axios } = require('axios')
const tokenBuilder = require('../utils/tokens')
const HOST_URL_APP_KEY = require('../utils/hosts')


exports.createGroup = async(req,res)=>{
    const appToken = tokenBuilder.appTokenBuild(50000)
    const name = req.body.groupname
    const description = req.body.desc
    const max_users = req.body.maxusers
    const owner = req.body.owner
    
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
    const id = groupId.data.id
    return res.json({id})
}

exports.getGroups = async(req,res)=>{
    const appToken = tokenBuilder.appTokenBuild(3000)
   

    const groups = await axios.get(`${HOST_URL_APP_KEY}/chatgroups`,{
        headers:{
            Authorization: `Bearer ${appToken}`,
            'Accept' : 'application/json'
        }
    })
    const roomData = groups.data
   return res.json(roomData)

}
exports.getGroupByUser = async(req,res)=>{
    const appToken = tokenBuilder.appTokenBuild(3000)
    const user = req.params.username

    const group = await axios.get(`${HOST_URL_APP_KEY}/users/${user}/joined_chatgroups`,{},{
        headers:{
            Authorization: `Bearer ${appToken}`,
            'Accept' : 'application/json'
        }})
    const groupsData = group.data
    return res.json(groupsData)
}

exports.deleteGroup = async(req,res)=>{
    const appToken = tokenBuilder.appTokenBuild(3000)
    const groupId = req.params.chatgroupid


    const response = await axios.delete(`${HOST_URL_APP_KEY}/chatgroups/${groupId}`,{},{
        headers:{
            Authorization: `Bearer ${appToken}`,
            'Accept' : 'application/json'
        }
    })
    const ress = response.data
    return res.json(ress)
}

exports.addUserToGroup = async(req,res)=>{
    const appToken = tokenBuilder.appTokenBuild(3000)
    const groupId = req.body.groupId
    const username = req.body.username

    const response = await axios.post(`${HOST_URL_APP_KEY}/chatgroups/${groupId}/users/${username}`,{}, {
        headers:{
            Authorization: `Bearer ${appToken}`,
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        }

    })
    const ress = response.data
    return res.json(ress)

}
exports.removeUserFromGroup = async(req,res)=>{
    const appToken = tokenBuilder.appTokenBuild(3000)
    const groupId = req.params.groupId
    const userid = req.params.userid


    const response = await axios.delete(`${HOST_URL_APP_KEY}/chatgroups/${groupId}/users/${userid}`,{
        headers:{
            Authorization: `Bearer ${appToken}`,
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        }
    })

    const ress = response.data
    return res.json(ress)

}

