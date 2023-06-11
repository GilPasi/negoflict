import { useGet_all_usersQuery, useChangeFirstLoginMutation,useChangePasswordMutation } from "../../../store";
import {useNavigate} from 'react-router-dom'
import useAlert from '../../../hooks/useAlert'
const ManageAccounts = () => {
//hooks================
const navigate = useNavigate()
const {trigerNotification} = useAlert()


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


//adding ui gil-pasi make your magic<><><><><><><>
return (
    <div></div>
)

    





}
export default ManageAccounts;