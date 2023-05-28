import '../../styles/components/add_window.css'
import Button from "../../components/general/Button"
import {useEffect, useState} from 'react'
import { useGetContactsQuery } from '../../store' 
import { useSelector } from 'react-redux'
import { useRegisterManyUsersToGroupMemberMutation, useGetUsersByCaseQuery, useSetUserCaseAttributeMutation, useGetChatGroupsQuery } from '../../store'
import CreateSelfUser from '../../pages/CreateSelfUserPage'

import Loader from './Loader'
import {useLocation} from "react-router-dom";
import useChat from '../../hooks/useChat'

const AddWindow =()=>{
    //finish the add window hen berti
    //hooks==============================
    const location = useLocation()
    const {addUsersToGroup} = useChat()
    //=================================================================================================

    //state==============================
    const [stage,setStage] = useState('pick side')
    const [side,setSide] = useState('')
    const {id} = useSelector(state=>state.user)
    const {caseId,groups} = location.state ?? '' //holds the case id
    const [usersToAdd,setUsersToAdd] = useState([])
    const [selectedUsers,setSelectedUsers] = useState([])
    const buttonsWidth = '6em';
    //=================================================================================================

    //queries==============================
    const {data:groupsData, isLoading:loadingGetGroups} = useGetChatGroupsQuery({CaseId:caseId})
    const {data:usersData, error:usersError, isLoading:loadingGetUsers, refetch:refetchUsers} = useGetUsersByCaseQuery({caseChat:caseId})
    const {data:contactsData, isLoading:loadingGetContact, refetch:refetchContacts} = useGetContactsQuery({mediator_id:id})
    //=================================================================================================

    //lazyQueries==============================
    const [registerManyUsersToGroupMember,{isLoading:loadingRegisterUsers}] = useRegisterManyUsersToGroupMemberMutation()
    const [setUserCaseAttribute,{isLoading:loadingSetUserCaseAttribute}] = useSetUserCaseAttributeMutation()

    //=================================================================================================

    //useEffect==============================
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

    //=================================================================================================

    //functions==============================
    const handleChangeSide = ({currentTarget:input})=>{
        const {value} = input
        setSide(()=>value)
    };

    // return the users that are not in the group
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
    ));

    // handle the users that are selected
    const  handleMark=(user)=> {
        if (selectedUsers.includes(user))
          setSelectedUsers(selectedUsers.filter(p => p !== user));
        else
          setSelectedUsers([...selectedUsers, user]);
      };

        //handle the add button click event
    // add the users to the group and set the user case attribute
    // if the user is already in the group, set the user case attribute
    // if the user is not in the group, add the user to the group and set the user case attribute
    // if the user is not in the group and the user case attribute is already set, do nothing
    // if the user is not in the group and the user case attribute is not set, add the user to the group and set the user case attribute
      const handleAddExistingUsers=()=>{
        if(!groups || side==='')return

          const sideCheck = side
          let agoraUserNames = selectedUsers.map(user=>user)

          const centeredGroupId = groups.find(group => group.groupname.endsWith('G'))?.groupid
          const sideGroupId = groups.find(group => group.groupname.endsWith(sideCheck))?.groupid

          addUsersToGroup({users:agoraUserNames,group:centeredGroupId})
               .then(res=>console.log('signCenter',res))
                .catch(err=>console.log(err))

          addUsersToGroup({users:agoraUserNames,group:sideGroupId})
               .then(res=>console.log('signSide',res))
                .catch(err=>console.log(err))


          //
          // addUsersToGroup({groupId:centeredGroupId,usernames:agoraUserNames})
          //   .then(res=>console.log('signCenter',res))
          //   .catch(err=>console.log(err))
          //
          // addUsersToGroup({groupId:sideGroupId,usernames:agoraUserNames})
          //   .then(res=>console.log('signSide',res))
          //   .catch(err=>console.log(err))

          handleAddOrSetUser(sideCheck)
      };

      const handleAddOrSetUser =async (sideCheck)=> {
          const groupChatId = groupsData.find(group => group.chat === sideCheck)?.id

          let usersDataArr = []
          selectedUsers.forEach(user => {
              const userData = {
                  side: side,
                  group_chat: groupChatId,
                  user: user.id,
                  case: caseId,
                  mediator: id
              }
              usersDataArr = [...usersDataArr, userData]
          })

          const filteredUsers = await trySetUserCaseAttribute(usersDataArr)
          registerManyUsersToGroupMember({users: filteredUsers})
              .then(() => refetchUsers() && refetchContacts())
              .catch(err => console.log(err))

          setStage('success')
      };


      const trySetUserCaseAttribute = async (users)=>{
        let filterdUsers = []
        for(let i in users){
            const { error }= await setUserCaseAttribute({case_id:caseId, user_id:users[i].user,status:true})
            if(error?.status=== 400 && error?.data === 'member not found')
                filterdUsers = [...filterdUsers, users[i]]
        }
        return filterdUsers
      };


    return(
        <article>
            {(loadingGetContact || loadingGetUsers || loadingGetGroups || loadingRegisterUsers || loadingSetUserCaseAttribute)?
                    <Loader withLogo={true} size={'medium'}/>:

            <div>

            {stage==='pick side' &&
             <center>
                <h1 className="add-win--title">Choose a party to add a person</h1>
                <hr/>

                <div className='add-win--side'>
                    <input
                        type='radio'
                        className='add-win--circle'
                        value='A'
                        name='side select'
                        onChange={handleChangeSide}
                        />

                    <input
                        type='radio'
                        className='add-win--circle'
                        value='B'
                        name='side select'
                        onChange={handleChangeSide}
                        />
                </div>
                <Button text="Next" margin='4em 0 0 0' size='small' onClick={()=>setStage('choose')}/>
            </center>
            }


            {stage==='choose' &&
             <center>
                <h1 className="add-win--title">Add a new participant</h1>
                    <Button text="Exisiting user" length={buttonsWidth} onClick={()=>setStage('exist')}/>
                    <Button text="Create user" length={buttonsWidth} onClick={()=>setStage('create') }/>
            </center>
            }

            {stage==='create'&&<CreateSelfUser
            fulfiled={()=>{
                setStage('exist')
                refetchUsers()
                refetchContacts()
            }}
            goBack={()=>setStage('choose')}
            />}

            {stage==='exist'&&
                <center>
                    <h1 className='add-win--title'>Choose participants</h1>
                    <hr />
                    <div className="add-win--users-list">
                        {usersView}


                    </div>
                    {selectedUsers.length === 0&&<p className='warning' id='add-win-w'>You must select at least one user</p>}

                    <footer>
                        <Button text='Back' length='5em' altitude='2em' margin='0.1em' onClick={()=>setStage('choose')}/>
                        <Button text='Add' length='5em' altitude='2em' margin='0.1em' onClick={handleAddExistingUsers} disabled={selectedUsers.length===0}/>
                    </footer>


                </center>}

                {stage==='success' &&
                <div>
                    <h1 className='add-win--success-title'>SUCCESS</h1>
                    <div className="add-win--success-animation">
                        <svg className="add-win--animation-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle className="add-win--checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                            <path className="add-win--checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                        </svg>
                    </div>
                </div>
                
                }
                </div>
            }
        </article>
    )
}
export default AddWindow