import '../../styles/components/add_window.css'
import AddUserPage from "../../pages/AddUserPage"
import Button from "../../components/general/Button"
import {useEffect, useState} from 'react'
import { useGetContactsQuery } from '../../store' 
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useAddingManyUsersToOneChatGroupMutation, useRegisterManyUsersToGroupMemberMutation, useGetUsersByCaseQuery,addPerticipents, useSetUserCaseAttributeMutation, useGetChatGroupsQuery } from '../../store'
import CreateSelfUser from '../../pages/CreateSelfUserPage'
import useChat from "../../hooks/useChat";
import Loader from './Loader'
import {useLocation} from "react-router-dom";

const AddWindow =()=>{
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
    //=================================================================================================

    //queries==============================
    const {data:groupsData, error:groupsError, isLoading:loadingGetGroups} = useGetChatGroupsQuery({CaseId:caseId})
    const {data:usersData, error:usersError, isLoading:loadingGetUsers} = useGetUsersByCaseQuery({caseChat:caseId})
    const {data:contactsData, error:contactsError, isLoading:loadingGetContact} = useGetContactsQuery({mediator_id:id})
    //=================================================================================================
    //lazyQueries==============================
    const [addManyUsersToOneChatGroup,{isLoading:loadingAddUsers}] = useAddingManyUsersToOneChatGroupMutation()
    const [registerManyUsersToGroupMember,{isLoading:loadingRegisterUsers}] = useRegisterManyUsersToGroupMemberMutation()

    //=================================================================================================

    //useEffect==============================
    useEffect(()=>{
        if(!usersData || !contactsData)return
        const users = usersData.map(user=>user.user)
        const contacts = contactsData.map(contact=>contact.user)
        const usersToAdd = contacts.filter(contact=>!users.includes(contact.id))
        setUsersToAdd(()=>usersToAdd)
    },[usersData,contactsData])

    //=================================================================================================

    console.log('usersdata',usersData,'contactdata',contactsData,groupsData)

    const handleChangeSide = ({currentTarget:input})=>{
        const {value} = input
        setSide(()=>value)
    }

    const buttonsWidth = '6em'

    const usersView  = usersToAdd.map(user=>(
        <label key={user.id} className="add-win--u-container">
            <div className="add-win--option" >
                <span> {`${user.first_name} ${user.last_name}`}</span>
                <span> {'    '}</span>
                <span> {user.email}</span>
            </div>

            <input
                // checked={selectedUsers.includes(user.id)?'checked':''}
                type="checkbox"
                onClick={()=>handleMark(user)}
                // name={index}
            />
            <div className="add-win--checkmark"/>
        </label>
    ))

    const  handleMark=(user)=> {
        if (selectedUsers.includes(user)) {
          setSelectedUsers(selectedUsers.filter(p => p !== user));
        } else {
          setSelectedUsers([...selectedUsers, user]);
        }
      }
      console.log(groups)
    console.log('side',side)

      const handleAddExistingUsers=()=>{
        if(!groups || side==='')return

          const sideCheck = side
          let agoraUserNames = selectedUsers.map(user=>user.username.replace(/[^\w\s]/gi, ''))

          const centeredGroupId = groups.find(group => group.groupname.endsWith('G'))?.groupid
          const sideGroupId = groups.find(group => group.groupname.endsWith(sideCheck))?.groupid


          addUsersToGroup({groupId:centeredGroupId,usernames:agoraUserNames})
            .then(res=>console.log('signCenter',res))
            .catch(err=>console.log(err))

          addUsersToGroup({groupId:sideGroupId,usernames:agoraUserNames})
            .then(res=>console.log('signCenter',res))
            .catch(err=>console.log(err))

          const groupChatId = groupsData.find(group => group.chat===sideCheck)?.id


          let usersDataArr = []
          selectedUsers.forEach(user=> {
              const userData = {
                  side: side,
                  group_chat: groupChatId,
                  user: user.id,
                  case: caseId,
                  mediator: id
              }
              usersDataArr = [...usersDataArr, userData]
          })

          




      }

      console.log('groupsss',groupsData)

      console.log('selectedUsers',selectedUsers)





    return(
        <article>
            {(loadingGetContact || loadingGetUsers) &&
                // <div style={{position:'fixed',zIndex:'100',width:'100%',height:'100%',opacity:'0.6',backgroundColor:'gray', left:'50%',top:'50%',transform:'translate(-50%,-50%)'}}>
                    <Loader withLogo={true} size={'medium'}/>
                // </div>
            }



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

            {/*{stage==='create'&&<CreateSelfUser*/}
            {/*fulfiled={()=>{*/}
            {/*    setStage('exist')*/}
            {/*    refetchGetUser()*/}
            {/*    refetchContact()*/}
            {/*}}*/}
            {/*goBack={()=>setStage('choose')}*/}
            {/*/>}*/}

            {stage==='exist'&&
                <center>
                    <h1 className='add-win--title'>Choose participants</h1>
                    <hr />
                    <div className="add-win--users-list">
                        {usersView}


                    </div>
                    <p className='warning' id='add-win-w'>You must select at least one user</p>
                    <footer>
                        <Button text='Back' length='5em' altitude='2em' margin='0.1em' onClick={()=>setStage('choose')}/>
                        <Button text='Add' length='5em' altitude='2em' margin='0.1em' onClick={handleAddExistingUsers} disabled={false}/>
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
              
                
                

        </article>
    )
}
export default AddWindow