import { useSelector } from "react-redux";
import '../../styles/components/users_list.css'
import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import useChat from "../../hooks/useChat";
import { useGetFullUsersByCaseQuery, useLazyGetMyMediatorQuery, useSetUserCaseAttributeMutation } from "../../store";
import Loader from "./Loader";
import { getPermName } from "../../utils/permissions";
import Button from "./Button";




const UsersList = ({handleSelctedUser, isMediator , fontSize, usersOnline,handleUsersArrayChange})=>{
    //hooks================
    const location = useLocation()
    const { subscribePresence, getPresenceStatus, presenceListener, removeUserFromGroup, removeEventById, publishPresence, groupListener } = useChat()
    //variables&&store================
    const users = useSelector(state=>state.perticipent)
    const { username, role, mediator } = useSelector(state=>state.user)
    const myAgoraUsername = useMemo(()=>username.replace(/[^\w\s]/gi, ''))
    const { groups = [] } = location.state ?? []
    const { caseId } = location.state ?? ''
    const centeredGroup = useMemo(()=> groups.find(group=>group.groupname.endsWith("G")))
    const roleName = useMemo(()=>getPermName({role:role}))
    //api================
    const { data:usersByCaseData, isLoading, error:usersByCaseError, refetch } = useGetFullUsersByCaseQuery({caseId:caseId})
    const [getMediator] = useLazyGetMyMediatorQuery()
    const [removeFromCase] = useSetUserCaseAttributeMutation()
    //state================
    const [participants, setParticipants] = useState([])
    const [statusQueue, setStatusQueue] = useState([])
    const [selectedUser,setSelectedUser] = useState(null)
    const [loading,setLoading] = useState(false)

    //variables================
    let debounceTimer = null;




    
    useEffect(()=>{
        if(!usersByCaseData) return
    
        handleSetParticipents()
        groupListener({id:'usersListGroupListener',handleGroupChange:handleGroupChangeUsers})
        presenceListener({id:'UsersListListener',presentsHandler:handleStatusChange})
       
    },[usersByCaseData])

    useEffect(()=>{
        if(usersByCaseError&&usersByCaseError.status === 404)
        setParticipants(()=>[])
    },[usersByCaseError])
    
    useEffect(()=>{
        return ()=>{
            removeEventById({id:'UsersListListener'})
        }
    },[])

    const getUserStatus = (username)=>{
        const online = [...usersOnline]
       return online.includes(username)
        
    }
 

const handleGroupChangeUsers = (msg) => {

    if(roleName==='mediator') return
   
    const { operation } = msg;
    if (operation === "memberPresence" || operation === "memberAbsence") {
        
        // Clear the previous timer if it exists
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        // Set a new timer
        debounceTimer = setTimeout(() => {
            refetch();
            debounceTimer = null; // Reset the timer
        }, 2000); // 2000 milliseconds = 2 seconds
    }
};



    const handleSetParticipents = ()=>{
        const participants = usersByCaseData.reduce((accumulator, {user, side})=>{
            if(user.username === username) return accumulator

            const agoraUsername = user.username.replace(/[^\w\s]/gi, '');
            const firstName = user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1)
            const lastName = user.last_name.charAt(0).toUpperCase() + user.last_name.slice(1)
    
            accumulator[agoraUsername] = {
                ...user,
                connect: getUserStatus(user.first_name),
                agoraUsername: agoraUsername,
                
                fullName: `${firstName} ${lastName}`,
                side: side,
            };
           
            return accumulator;
        }, {})
        if(roleName === 'user'){
            const { mediator } = usersByCaseData[0]
            getMediator({mediatorId:mediator}).then(({data})=>{

                const {first_name,last_name, username } = data.user
                participants[username] = {
                    ...data.user,
                    connect: getUserStatus(username),
                    agoraUsername: username,
                    fullName: `${first_name} ${last_name}`,
                    side: 'M',
            }})}


        handleGetStatus(participants)
    }

  

    const handleGetStatus = (parts)=>{
        
        const members = Object.keys(parts)
        if(roleName === 'user'&& mediator) members.push(mediator)
     
        subscribePresence({usernames:members}).then(()=>{
            getPresenceStatus({usernames:members}).then(({result})=>{
           
                if(!result) return
                let users = ({...parts})
                result.forEach(user=>{
                    const userParts = user.ext.split('=')
                    const status = userParts[0]
                    const username = userParts[1]
                    if(status === 'online' || status === 'offline'){
                        users[user.uid].connect = status === 'online'
                        handleUsersArrayChange(username,status)
                    }
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
                const status = ext.split('=')[0]
                const user = ext.split('=')[1]
         
                if(users[userId] && !(userId === myAgoraUsername)){
                    if(status ==='online' || status==='offline'){
                        users[userId]['connect'] = status === 'online'
                        handleUsersArrayChange(user,status)
                    }

                }
                    
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
    .then(res=>console.log(res, 'res')).then(()=>publishPresence({description:`remove=${agoraUsername}`}))
    .finally(()=>setLoading(false))


        document.querySelector(".cp--user-info").close()
        setSelectedUser(()=>null)
    }
    console.log('selectedUser', selectedUser)

    
    return(
        <div >
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
            
        <div className="users-list"  style={{position:'relative', width:'10em'}}>
            {usersByCaseError?.status ===404?<p>The chat group is empty. Please add members to start a conversation."</p> : participants.length===0||loading?<Loader size='x-small' withLogo={false}/>: Object.values(participants).map(user=>{
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