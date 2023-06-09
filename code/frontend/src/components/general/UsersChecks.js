import "../../styles/components/users_checks.css"

import Button from "../../components/general/Button"
import {useEffect, useState} from 'react'
import { useGetContactsQuery } from '../../store' 
import { useSelector } from 'react-redux'
import {  useGetUsersByCaseQuery, useGetChatGroupsQuery } from '../../store'

import {useLocation} from "react-router-dom";
const UsersChecks = ({handleSubmit , handleBack , submitText})=>{
    
    const location = useLocation()
    const [markedUsers,setMarkedUsers] = useState([])
    const [usersToAdd,setUsersToAdd] = useState([])
    const {caseId,groups} = location.state ?? '' //holds the case id
    const {id} = useSelector(state=>state.user)


    //queries==============================
    const {data:groupsData, isLoading:loadingGetGroups} = useGetChatGroupsQuery({CaseId:caseId})
    const {data:usersData, error:usersError, isLoading:loadingGetUsers, refetch:refetchUsers} = useGetUsersByCaseQuery({caseChat:caseId})
    const {data:contactsData, isLoading:loadingGetContact, refetch:refetchContacts} = useGetContactsQuery({mediator_id:id})
    //=================================================================================================

    useEffect(()=>{
        if(!contactsData)return
        if(!usersData && (usersError?.status!==404 || !usersError))return

        const users = usersData? usersData.map(user=>user.user) : []
        const contacts = contactsData.map(contact=>contact.user)
        let usersToAdd = []
        if(users.length >0)
            usersToAdd = contacts.filter(contact=>!users.includes(contact.id))
        else
            usersToAdd = contacts


        setUsersToAdd(()=>usersToAdd)

    },[usersData,contactsData,usersError]);


    // handle the users that are selected
    const  handleMark=(user)=> {
        if (markedUsers.includes(user))
            setMarkedUsers(markedUsers.filter(p => p !== user));
        else
            setMarkedUsers([...markedUsers, user]);
        };



    const usersView  = usersToAdd.map(user=>(
        <label key={user.id} className="add-win--u-container">
            <div className="add-win--option" >
                <span> {`${user.first_name} ${user.last_name}`}</span>
                <span> {'    '}</span>
                <span> {user.email}</span>
            </div>

            <input
                type="checkbox"
                onClick={()=>handleMark(user)}

            />
            <div className="add-win--checkmark"/>
        </label>
    ))

    return(
        <section>
            <h1 className='users-checks--title'>Choose participants</h1>
            <hr />
            <div className="users-checks--list">
                {usersView}
            </div>
            <p className='warning' style={{color: markedUsers.length === 0? "red":"transparent"}}>You must select at least one user</p>
            <Button 
                text='Back' 
                length='5em' 
                altitude='2em' 
                margin='0.1em' 
                onClick={handleBack}
            />
            <Button 
                text={submitText}
                length='5em' 
                altitude='2em' 
                margin='0.1em' 
                // onClick={()=>handleSubmit(markedUsers)} 
                disabled={markedUsers.length===0}
            />
        </section>)

}
export default UsersChecks