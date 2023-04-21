import "../styles/pages/login_page.css"
import Header from "../components/general/Header"
import TextInput from "../components/general/TextInput"
import Button from '../components/general/Button'
import { useEffect, useRef, useState } from "react"
import { useDispatch,  } from 'react-redux'
import { login } from '../store/index'
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import useAlert from "../hooks/useAlert"
import { getPermSign, getPermName } from "../utils/permissions"
import { useLazyLoginQuery, useLazyIs_loginQuery,useLazyLog_outQuery, useLazyGetTokenQuery } from "../store/index"
import Loader from "../components/general/Loader"
import { useChangePasswordMutation, useModifyUserMutation } from "../store/index"



const LoginPage=()=>{
    //dont change the order*******
    //status = finished
    //4 requests=>2 requests && move to redux-fetch usersApi

    //hooks=====
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { bigSuccessAlert, changePasswordPop } = useAlert()
    const [changePassword] = useChangePasswordMutation()
    const [modifyUserDetail] = useModifyUserMutation()
    //==========

    //state==========
    const baseData = {username:'',email:'',password:''}
    const [isMediator,setIsMediator] = useState(false)
    const [formData,setFormData] = useState(baseData)
    //===========
     

    //values========
    const loginHref = isMediator?'Login as User': 'Login as Mediator'
    const WasMounts = useRef(false)
    const { accessToken, role } = useSelector(state=>state.user)
    //==========
  
    //apiHooks=====
    const [fetchUser,{isLoading:loadingFetchUser}] = useLazyLoginQuery()
    const [fetchToken,{isLoading:loadingFetchToken}] = useLazyGetTokenQuery()
    const [fetch_is_login] = useLazyIs_loginQuery()
    const [fetch_logout] = useLazyLog_outQuery()
    //********
    

    //useEffect=======
    useEffect(()=>{
        if(WasMounts.current)return
        isLogin()
    },[]);
    useEffect(()=>{
        setFormData(baseData)
    },[isMediator])
    //==========

    //middleware=====
    if(loadingFetchUser || loadingFetchToken)return <Loader withLogo={true}/>

    //=========

    //handlers=======
    const handleChange = ({currentTarget:input})=>{
        const {name,value} = input

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
          }))};
    
    const submitHandlerMediator =async (event)=>{
    event.preventDefault()
    submitLogin(formData,formData.email)
    };

    const submitHandlerUser =async (event)=>{
        event.preventDefault()
        

        const {password, username} = formData
       
        const data = {password:`Negoflict${password}`, username:username}

        submitLogin(data,username)
    };   
    //=============

    //functions==========
    const isLogin =async ()=>{ 
        const token = accessToken || null

        if(token){ 
            const {isSuccess} =await fetch_is_login(token)

            if(isSuccess){
                directTo(role)
                return
            }
        }
       fetch_logout()
    };
    const submitLogin =async (data,checkprop)=>{

        const {data:access_data,error:errorToken} = await fetchToken(data)
        
        if(errorToken){
            console.log('token error',errorToken)
            return
        }

        let {data:user, error:errorUser} =await fetchUser({username:formData.username,access:access_data.access})
        if(user.email !== checkprop)return //email or username not match

        if(errorUser){
            console.log('user error',errorUser)
            return
        }
        
        const role = getPermSign(user)
        const roleName = getPermName({role:role})
        user = {...user, 'role':role, 'access':access_data.access}
        dispatch(login(user))


        if(user.first_logged){  //if it is a user and it is his first login he must to change default password unless he dosent the mediator or other users can know his password because he will login with his email and phone number
            const newPassword =await changePasswordPop()
            
            if(!newPassword.value)return
            const {error:changePasswordError} =await changePassword({
                current_password:data.password,
                new_password:newPassword.value,
                access:access_data.access,
                role:roleName
            })
            if(changePasswordError){
                console.log('couldn`t change password',changePasswordError)
                return
            }
            const {error:modifyUserError} =await modifyUserDetail({
                id:user.id,
                access:access_data.access,
                password:newPassword.value
                
            })
            if(modifyUserError){
                console.log('couldn`t modify user first logged',modifyUserError)
                return
            }
        }
        setNullFields()
        directTo(role)
        };
    const directTo = (role)=>{
        bigSuccessAlert('Login successfuly')

        switch(role){
            case 1:
                navigate('/admin')
                break;
            case 2:
                navigate('/mediator')
                break
            case 3:
                navigate('/user/cases/?open_close=True')
                break
            default:
                navigate('/login')
        }
    };
    const setNullFields = ()=>{
        setFormData({})
    };


    return(
        <article className="lp page" >
            <div className="limiter">
                <Header isLarge={true} />
                <h1 className="lp--title">Log-in<br/>{isMediator?<span>Mediator</span>:<div></div>}</h1>

                <form onSubmit={isMediator?submitHandlerMediator:submitHandlerUser} className="lp--form">
                    {isMediator?
                   ( <TextInput 
                    type="text"
                    placeHolder="Username"
                    onChange = {handleChange}
                    name = 'username'
                    value={formData.username}
                />):(<div></div>)}
                    


                    <TextInput 
                                type="email"
                                placeHolder="Email"
                                onChange = {handleChange}
                                name={isMediator?'email':'username'}
                                value={isMediator?formData.email:formData.username}
                            />

                    <TextInput 
                                type="password"
                                placeHolder="Password"
                                onChange = {handleChange}
                                name='password'
                                value={formData.password}
                            />
                            <div className="flexbox">
                                <input  type="checkbox" id="lp--checkbox"/>
                                <label htmlFor="lp--checkbox">Disclaimer Lorem ispum dolor T&C <a href="#"> Link</a></label>
                            </div>
                            
                    <Button  text="Submit" size="small"/>
                </form> 
                
                <center>
                    <label 
                        style={{padding:'10px'}}>
                        <a href=""
                        onClick={event=>{
                            event.preventDefault()
                            isMediator?setIsMediator(false):setIsMediator(true)
                        }}>
                            {loginHref}
                        </a>
                    </label>
                </center>
            </div>
        </article>
)}
export default LoginPage