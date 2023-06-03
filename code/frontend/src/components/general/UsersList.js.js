import { connect, useSelector } from "react-redux";
import '../../styles/components/users_list.css'
import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import useChat from "../../hooks/useChat";
import { useGetFullUsersByCaseQuery, useLazyGetMyMediatorQuery, useSetUserCaseAttributeMutation } from "../../store";
import Loader from "./Loader";
import { getPermName } from "../../utils/permissions";
import Button from "./Button";




const UsersList = ({handleSelctedUser, isMediator})=>{
    //hooks================
    const location = useLocation()
    const { subscribePresence, getPresenceStatus, presenceListener, removeUserFromGroup } = useChat()
    //variables&&store================
    const users = useSelector(state=>state.perticipent)
    const { username, role } = useSelector(state=>state.user)
    const myAgoraUsername = useMemo(()=>username.replace(/[^\w\s]/gi, ''))
    const { groups = [] } = location.state ?? []
    const { caseId } = location.state ?? ''
    const centeredGroup = useMemo(()=> groups.find(group=>group.groupname.endsWith("G")))
    const roleName = useMemo(()=>getPermName({role:role}))
    //api================
    const { data:usersByCaseData, isLoading, error:usersByCaseError } = useGetFullUsersByCaseQuery({caseId:caseId})
    const [getMediator] = useLazyGetMyMediatorQuery()
    const [removeFromCase] = useSetUserCaseAttributeMutation()
    //state================
    const [participants, setParticipants] = useState([])
    const [statusQueue, setStatusQueue] = useState([])
    const [selectedUser,setSelectedUser] = useState(null)
    const [loading,setLoading] = useState(false)



    
    useEffect(()=>{
        if(!usersByCaseData) return
        handleSetParticipents()
        presenceListener({id:'UsersListListener',presentsHandler:handleStatusChange})

       
    },[usersByCaseData])


    const handleSetParticipents = ()=>{
        const participants = usersByCaseData.reduce((accumulator, {user, side})=>{
            if(user.username === username) return accumulator

            const agoraUsername = user.username.replace(/[^\w\s]/gi, '');
            accumulator[agoraUsername] = {
                ...user,
                connect: false,
                agoraUsername: agoraUsername,
                fullName: `${user.first_name} ${user.last_name}`,
                side: side,
            };
            return accumulator;
        }, {})
        if(roleName === 'user'){
            const { mediator } = usersByCaseData[0]
            getMediator({mediatorId:mediator}).then(({data})=>{
                console.log(data, 'mediator data')
                const {first_name,last_name, username } = data.user
                participants[username] = {
                    ...data.user,
                    connect: false,
                    agoraUsername: username,
                    fullName: `${first_name} ${last_name}`,
                    side: 'M',
            }})}


        handleGetStatus(participants)
    }


    const handleGetStatus = (parts)=>{
        
        const members = Object.keys(parts)
     
        subscribePresence({usernames:members}).then(()=>{
            getPresenceStatus({usernames:members}).then(({result})=>{
           
                if(!result) return
                let users = ({...parts})
                result.forEach(user=>{
                    users[user.uid].connect = user.ext === 'online'
                })
                setParticipants(users)
            })})
    }

    const handleStatusChange = (msg)=>{
        setStatusQueue(prev=>[...prev, msg])
    }

    useEffect(()=>{
        if(statusQueue.length === 0)return
        const statuses = statusQueue.map(p=>p)
        statuses.forEach(msg=>{
            let users = ({...participants})

            msg?.forEach(({userId, ext})=>{
                if(!(userId === myAgoraUsername))
                    users[userId]['connect'] = ext === 'online'
            })
            setParticipants(()=>users)
        })
        return()=>setStatusQueue([])

    },[statusQueue])



    const fontColor = "#000000d4"

    const handleObserve = (user)=>{
        setSelectedUser(()=>user)
        const modal = document.querySelector(".cp--user-info")
        
        modal.show()
    }

    const handleRemove = ()=>{
        const { agoraUsername, side, id:userId } = selectedUser
    setLoading(true)
    const groupsArray = groups.map(group=>group).filter(group=>group.groupname.endsWith("G")||group.groupname.endsWith(side))
    Promise.all([removeUserFromGroup({user:agoraUsername, groupId:groupsArray[0].groupid}),
                removeUserFromGroup({user:agoraUsername, groupId:groupsArray[1].groupid}),
                removeFromCase({case_id:caseId, user_id:userId, status:false })])
    .then(res=>console.log(res, 'res'))
    .finally(()=>setLoading(false))


        document.querySelector(".cp--user-info").close()
        setSelectedUser(()=>null)
    }
    console.log('selectedUser', selectedUser)

    


    return(
        <div>
            <dialog className="cp--user-info">
                {selectedUser&&
                    <h3>Do yo want to remove {selectedUser['fullName']} from the group ?</h3>
                }
               <Button
                    onClick={()=>document.querySelector(".cp--user-info").close()}
                    text="cancel"
                    altitude="2em"
                    length="5em"
                    margin="5px"
                />
                <Button
                    onClick={handleRemove}
                    text="remove"
                    altitude="2em"
                    length="5em"
                />
            </dialog> 
            
        <div className="users-list" >
            {participants.length===0||loading?<Loader size='x-small' withLogo={false}/>: Object.values(participants).map(user=>{
                return(
                <div key={user.agoraUsername} className="users-list--member"
                  onClick={isMediator?()=>handleObserve(user): null}
                  >
                    <div className="users-list--side" 
                       
                    style={{color:fontColor,
                            borderColor:fontColor,
                            backgroundColor:user.connect === true?"var(--green-dark)" :"transparent"}}>
                        {user.side}
                    </div>
                    <div style={{color:fontColor}}>{user.fullName}</div>
                </div>
            )})}
        </div>
        </div>
    )
}
export default UsersList