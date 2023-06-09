import "../../../styles/pages/manage_account_page.css"
import Header from "../../../components/general/Header.js"
import UsersChecks from "../../../components/general/UsersChecks.js"
import Button from "../../../components/general/Button.js"
import IconImageUser from "../../../components/general/iconImageUser"
import PopUpGeneral from "../../../components/general/PopUpGeneral"
import TrashIcon from "../../../components/general/icons/TrashIcon"
import '../../../styles/components/MediatorList.css'

import {useState} from 'react'
import { useGet_all_usersQuery, useChangeFirstLoginMutation,useChangePasswordMutation } from "../../../store";
import {useNavigate} from 'react-router-dom'
import useAlert from '../../../hooks/useAlert'
const ManageAccountsPage = () => {
//hooks================
const navigate = useNavigate()
const {trigerNotification} = useAlert()
const [action , setAction] = useState("main") 
const [selectedUsers,setSelectedUsers] = useState([])
const [show, setShow] = useState(false)
const [infoChoose, setInfoChoose] = useState({})


//api===============
const {data:allUsersData, error:allUsersError, isLoading} = useGet_all_usersQuery()//get all users..
//lazy_api===============
const [changeFirstLogin,{data:changeFirstLoginData, error:changeFirstLoginError, isLoading:changeFirstLoginLoading}] = useChangeFirstLoginMutation()
const [changePassword,{data:changePasswordData, error:changePasswordError, isLoading:changePasswordLoading}] = useChangePasswordMutation()


//functions================

//this is the function that will be called when the admin will change the password of the user
const handleChangePassword = ({id,newPassword})=>{
    changeFirstLogin({userId:id})
    .then(()=>changePassword({userId:id,password:newPassword}).then(res=>console.log(res)).then(()=>rediract(true)).catch(err=>console.log(err)))
    .catch(err=>{
        console.log(err)
        rediract(false)
    })
}

const rediract = (isSuccess)=>{
    if(isSuccess)
        trigerNotification('Password changed successfully','success')
    else
        trigerNotification('Password changed failed','error')

    navigate(-1,{replace:true})
}

const  handleMark=(user)=> {
    if (selectedUsers.includes(user))
      setSelectedUsers(selectedUsers.filter(p => p !== user));
    else
      setSelectedUsers([...selectedUsers, user]);
  };

const handleDeleteUser = (users)=>{
    //Hen do your thing
    console.log(users)
}

const handleOpen=(info)=>{
    console.log('innn',info)
    setInfoChoose(info)
    setShow(prev=>!prev)
}
const handleClose = ()=>{
    setShow(false)

}

const mockUserData = [
    {
        user : {
            id:"12313" , 
            first_name:"avi" , 
            last_name:"ron"
        },
        user : {
            id:"3321321" , 
            first_name:"eli" , 
            last_name:"copter"
        },
    }

]


let currentView = <></>

switch(action){
    case "delete user":
        currentView =
         <center>
            <UsersChecks 
                submitText="delete"
                handleBack={()=>setAction("main")}
                handleSubmit={handleDeleteUser} />
        </center>
        break;
        
    case "edit user":
        currentView = 
        <div style={{position:'relative'}}>
            <h1 className="title">Users List</h1>
            {mockUserData.map(item=>{
                return(
                    <div className="info-mediator-box" key={item.user.id}>
                        <IconImageUser/>
                        <button className="on-open-info-btn" onClick={()=>handleOpen(item)}>
                            <div className="full-name-box" >
                                <span className="first_name_mediator">{item.user.first_name}</span>
                                <span className="last_name_mediator">{item.user.last_name}</span>
                            </div>
                        </button>
                        <div style={{marginLeft:"18px"}} >
                            <div style={{margin : " 16px"}}></div>
                        </div>
                    </div>  
                      
                )
            })}
                {show&&
                    <PopUpGeneral
                    onClose={handleClose}
                    children={infoChoose}
                    />}
        </div>
        break;

    default:
        currentView=
        <div className="centerizer">
            <h1 className="title-large" style={{margin:"0"}}>Manage Users</h1>
            <hr style={{width:"150px"}}/>
            <button className="map--btn" onClick={()=>setAction("delete user")}>Delete User</button>
            <button className="map--btn">Create User</button>
            <button className="map--btn" onClick={()=> setAction("edit user")}>Edit User</button>
            <h1 className="title-large" style={{margin:"0"}}>Manage Cases</h1>
            <hr style={{width:"150px"}}/>
            <button className="map--btn">Delete Case</button>
            <button className="map--btn">Create Case</button>
    </div>
    break;


}

return(
<article className="map">
    <Header isLarge={false}/>
        {currentView}

</article>)
}
export default ManageAccountsPage



