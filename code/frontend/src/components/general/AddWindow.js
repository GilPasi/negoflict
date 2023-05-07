import '../../styles/components/add_window.css'
import AddUserPage from "../../pages/AddUserPage"
import Button from "../../components/general/Button"
import {useEffect, useState} from 'react'
import { useGetContactsQuery } from '../../store' 
import { useSelector } from 'react-redux'
import { useAddingManyUsersToOneChatGroupMutation, useRegisterManyUsersToGroupMemberMutation, useGetUsersByCaseQuery } from '../../store'

const AddWindow =({groups})=>{
    const {agora,server,caseId} = groups

    const [stage , setStage] = useState('pick side');
    const [selectedUsers , setSelectedUsers] = useState([])
    const [side,setSide] = useState(null)
    const [Users, setUsers] = useState([])
    const {id} = useSelector(state=>state.user)
    const {data:participentsData, error:participentError} = useGetUsersByCaseQuery({caseChat:caseId})
    const {data:contantData, error:contactError} = useGetContactsQuery({mediator_id:id});
    const [addingUsersToChat] = useAddingManyUsersToOneChatGroupMutation()
    const [registerServerChatGroup] = useRegisterManyUsersToGroupMemberMutation()

    
    const buttonsWidth = '6em'


    useEffect(() => {
        if (participentError) {
          console.log("error", contactError);
          return;
        }
        if (!participentsData || !contantData) return;
      
        let participentsIds = participentsData.map((entry) => entry.user);
        console.log('ppppaaarrr==>>>>',participentsIds)
      
        let filteredUsersData = contantData.filter(
          (user) => !participentsIds.includes(user.user.id)
        );
        console.log('filteerrrrr',filteredUsersData)
      
        filteredUsersData.forEach((user) => {
          const tempUser = user["user"];
          const fullName = `${tempUser.first_name} ${tempUser.last_name}`;
          setUsers((prev) => [
            ...prev,
            { fullName: fullName, email: tempUser.email, id: tempUser.id },
          ]);
        });
      }, [participentsData, contantData]);
      

    function handleMark(user) {
        console.log(selectedUsers)
        if (selectedUsers.includes(user)) {
          setSelectedUsers(selectedUsers.filter(p => p !== user));
        } else {
          setSelectedUsers([...selectedUsers, user]);
        }
      }

    const users = Users.map(user=>(
        <label key={user.id} className="add-win--u-container">
            <div className="add-win--option" >
                <span> {user.fullName}</span>
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

    const handleAdd =async ()=>{
        if(selectedUsers.length===0){
            document.querySelector('#add-win-w').style.visibility='visible';
            return
        }
     
       let groupSideChoose = agora.find(group=>group.groupname.endsWith(side))
       let groupCenterChoose = agora.find(group=>group.groupname.endsWith('G'))
        addingUsersToChat({users:selectedUsers, group:groupSideChoose.groupid})
        addingUsersToChat({users:selectedUsers, group:groupCenterChoose.groupid})
       
    //    if(dataR){
    //     console.log('success',dataR)
    //    }
    //    else if(errorR){
    //     console.log('failer',errorR)
    //    }
    //    if(dataR2){
    //     console.log('success',dataR)
    //    }
    //    else if(errorR2){
    //     console.log('failer',errorR)
    //    }
       const filterdGroupChat = server.find(group=>group.chat === side)
       let usersDataArr = []


       selectedUsers.forEach(user=>{
        const userData = {
            side:side,
            group_chat:filterdGroupChat.id,
            user:user.id,
            case:caseId,
            mediator:id
        }
        usersDataArr = [...usersDataArr,userData]
       })
       registerServerChatGroup({users:usersDataArr})

    //    if(errorM){
    //     console.log(errorM)
    //    }
    //    else if(dataM){
    //     console.log(dataM)
    //    }

       
        /*Add to the chat - backend logic
            ...
            ...
            ...
        */
        setStage('success')
    }
    const handleSideChoose = ({currentTarget:input})=>{
        const {value} = input
        setSide(value)

    }

        
    return(
        <article>
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
                        onChange={handleSideChoose}
                        />
                        
                    <input 
                        type='radio'
                        className='add-win--circle' 
                        value='B'
                        name='side select'
                        onChange={handleSideChoose}
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


            {stage==='create'&&<AddUserPage
                window='large'
                goBack={()=>setStage('choose')}
                next={()=>setStage('success')}
            />}

            {stage==='exist'&&
                <center>
                    <h1 className='add-win--title'>Choose participants</h1>
                    <hr />
                    <div className="add-win--users-list">
                        {users}
           

                    </div>
                    <p className='warning' id='add-win-w'>You must select at least one user</p>
                    <footer>
                        <Button text='Back' length='5em' altitude='2em' margin='0.1em' onClick={()=>setStage('choose')}/>
                        <Button text='Add' length='5em' altitude='2em' margin='0.1em' onClick={handleAdd}/>
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