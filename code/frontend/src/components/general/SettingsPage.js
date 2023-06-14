import IconImageUser from "./iconImageUser"
import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { getPermName, getPermTotal } from "../../utils/permissions"
import Header from "./Header"
import { useLazyGetUserByIdQuery, useChangeFirstLoginMutation, useChanging_userPasswordMutation, useLazyGetMyAddressQuery } from "../../store"
import Button from "./Button"
import useAlert from "../../hooks/useAlert"
import Loader from "./Loader"
import { useRef } from "react"





const SettingsPage = ({detail,id})=>{
    //hooks===========
    const location = useLocation()
    const {regularAlert, deletAlert, justText} = useAlert()

    //variable========
    const {isMe} = location.state ?? ''
    const user = useSelector(state=>state.user)
    const userId = isMe? user.id : detail

    //lazyApi===========
    const [getUserById, {data:userData, error:userError, isLoading}] = useLazyGetUserByIdQuery()
    const [changePassword,{isLoading:loadingPasswordChange}] = useChanging_userPasswordMutation()
    const [resetFirstLogin,{isLoading:loadingFirstChange}] = useChangeFirstLoginMutation()
    const [getAddress] = useLazyGetMyAddressQuery()

    //states===========
    const [userDetail,setUserDetail] = useState({})
    const roleForPassword = useRef('')
   

    

    useEffect(()=>{
    
        if(isMe){
           let modify =  modUser(user)
           if(modify.role[0] === 'mediator')
              getAddress({mediator_id:user.id})
              .then(({data})=>{
                modify = {...modify, address:[data,false]}
                setUserDetail(modify,true)
              })
            else{
                setUserDetail(modify,true)
            }
        
        
    }else{
        getUserById({userId:id}).then(({data})=>{
            let modify = modUser(data)
            if(modify.role[0] === 'mediator')
            getAddress({mediator_id:data.id})
            .then(({data})=>{   
                modify = {...modify, address:[data.city,false]}
                setUserDetail(modify,true)
            })
            else{
                setUserDetail(modify,true)
            }
       
        })
 
        }
        
         

    },[userId])

    const modUser = (user,isMe)=>{
        if(Object.keys(user).length === 0)return
        const {email, first_name, last_name, role, is_superuser, is_staff, username} = user
        let roleName
        if(role) 
            roleName = getPermName({role:role})
        else
            roleName = getPermTotal({is_staff:is_staff, is_superuser:is_superuser})

        roleForPassword.current = roleName
        if (roleName === 'user')
        return {
            email:[email,false],
            first_name:[first_name,false],
            last_name:[last_name,false],
            role:[roleName,false]
        }
        else if (roleName === 'mediator')
        return {
            username:[username,false],
            email:[email,false],
            first_name:[first_name,false],
            last_name:[last_name,false],
            role:[roleName,false]
        }
        else if(roleName === 'admin'){
           return{ 
            username:[username,false],
            email:[email,false],
            role:[roleName,false]}

        }
       
    };
    const handleRestPassword =async ()=>{
      
        
        //{title, text, confirmText, background, icon}
      const response = await deletAlert({title:'Reset user password',text:'You are about to reset user password please confirm',confirmText:'Reset'})
        if(!response){
            const randomNumber = Math.floor(1000 + Math.random() * 9000);
            const newPassword =`Negoflict${randomNumber}`

           

            changePassword({userId:isMe?user.id:id,password:newPassword}).then(()=>resetFirstLogin({userId:isMe?user.id:id}))
            .then(async()=>{
                let passwordChoice
                if(roleForPassword.current === 'user'){
                    passwordChoice = randomNumber
                }
                else{
                    passwordChoice = newPassword
                }
                const { isConfirmed }= await regularAlert({title:`Password: ${passwordChoice}`,text:`We have generated a temporary password. Please make sure to send this password to the user.`})
           if(isConfirmed){
                navigator.clipboard.writeText(passwordChoice)
                await justText({text:'password was copied to your clipboard'})
           }
            })
        }

    }

    return(
        <div style={{width:'100%'}}>
            <div >
              
                <Header isLarge={true} withoutLinks={true}/>
            {isLoading || loadingPasswordChange || loadingFirstChange?(<Loader />):(<IconImageUser setting={true}/>)} 
            {Object.keys(userDetail).length !== 0 &&
                Object.keys(userDetail).map((key,index)=>{
                    console.log('sdafasdf')
                    return(
                        <div key={index}>
                            <div style={{display:'flex', justifyContent:'space-between'}}>
                            <p style={{fontFamily:'Roboto', fontSize:'larger', fontWeight:'600', marginRight:'10px'}}>{key}:</p>
                            <p style={{fontFamily:'Roboto', fontSize:'larger'}}>{userDetail[key][0]}</p>
                            {userDetail[key][1]&& <button className="buttonModify">modify</button>}
                            </div>
                        </div>
                    )
                })
            }
             <Button disabled={isLoading || loadingPasswordChange || loadingFirstChange} onClick={handleRestPassword} length={'fit-content'} altitude={'30px'} text={'Reset user password'} fontSize={'large'} />

            </div>

     
        </div>
    )

}
export default SettingsPage