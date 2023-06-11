import "../styles/pages/login_page.css"
import Header from "../components/general/Header"
import TextInput from "../components/general/TextInput"
import Button from '../components/general/Button'
import { useEffect, useState } from "react"
import { useDispatch,  } from 'react-redux'
import { login } from '../store/index'
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import useAlert from "../hooks/useAlert"
import { getPermSign, getPermName } from "../utils/permissions"
import { useLazyLoginQuery, useLazyIs_loginQuery,useLazyLog_outQuery, useLazyGetTokenQuery,useLazyGetUserByAccessQuery } from "../store/index"
import Loader from "../components/general/Loader"
import { useChangePasswordMutation, useModifyUserMutation, useLazyGetNewAccessQuery, persistor,logout } from "../store/index"
import { useLocation } from "react-router-dom"


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
    const [getNewAccess] = useLazyGetNewAccessQuery()
    const [getUserByAccess] = useLazyGetUserByAccessQuery()
    const location = useLocation();
    const { logout:is_logout } = location.state || {};
    //==========

    //state==========
    const baseData = {username:'',email:'',password:''}
    const [isMediator,setIsMediator] = useState(false)
    const [formData,setFormData] = useState(baseData)
    const [validity , setValidity] = useState({isValid:true, errorMsg:''})
    // setValidity({isValid:true, errorMsg:''})
    //===========
     

    //values========
    const loginHref = isMediator?'Login as User': 'Login as Mediator'
    const { access, role } = useSelector(state=>state.user)
    const hasCaseId = localStorage.getItem('case_id') || null
    const hasGroups = localStorage.getItem('groups') || null
    //==========
  
    //apiHooks=====
    const [fetchUser,{isLoading:loadingFetchUser}] = useLazyLoginQuery()
    const [fetchToken,{isLoading:loadingFetchToken}] = useLazyGetTokenQuery()
    const [fetch_is_login] = useLazyIs_loginQuery()
    const [fetch_logout] = useLazyLog_outQuery()
    
    //********

    useEffect(()=>{
        if(hasCaseId)
            localStorage.removeItem('case_id')
        if(hasGroups)
            localStorage.removeItem('groups')
        
        //Focus on the email field as the page uprise
        document.getElementById("username").focus()

    },[])
    

    //useEffect=======
    useEffect(()=>{
        // if(WasMounts.current)return
        if(is_logout===true){
            dispatch(logout())
            fetch_logout()
            persistor.purge()
            persistor.flush()
            return
        }

        isLogin()
    },[]);
    
    useEffect(()=>{
        setFormData(baseData)
        document.getElementById("username").focus()

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
        const token = access || null

        if(!token)return

       
        const {isSuccess} =await fetch_is_login(token)

            if(isSuccess){
                directTo(role)
                return
            }
        
        const {data:dataNewAcces,error:errorNewAcces} = await getNewAccess()
        if(dataNewAcces)
            console.log(dataNewAcces)
            await submitByAccessToken(dataNewAcces['access'])

        if(errorNewAcces){
            console.log(errorNewAcces)
        }
            
    };
    

    const submitByAccessToken =async (token)=>{
        if(!token)return
        const {data,error} =await  getUserByAccess({access:token})
        if(error)
            return
        console.log('userDetails',data)
        const role = getPermSign({is_staff:data[0]['is_staff'],is_superuser:data[0]['is_superuser']})


        const user = {id:data[0]['id'],
        username:data[0]['username'],
        email:data[0]['email'],
        access:token,
        role:role,
        first_name:data[0]['first_name'],
        last_name:data[0]['last_name'],
    }

        dispatch(login(user))
        directTo(role)



    }
    
    const submitLogin =async (data,checkprop)=>{

        if(access){
            dispatch(logout())
        }
        const {data:access_data,error:errorToken} = await fetchToken(data)
       
        
        if(errorToken){
            setValidity({isValid:false, errorMsg:'One or more details is incorrect'})
            console.log('token error',errorToken)
            return
        }

        let {data:user, error:errorUser} =await fetchUser({username:formData.username,access:access_data.access})

        if(user.email.toLowerCase() !== checkprop.toLowerCase()){
            setValidity({isValid:false, errorMsg:'Email do not match'})
            console.log('email not match')

            return
        } //email or username not match

        if(errorUser){
            console.log('user fetching error',errorUser)
            return
        }
      
        
        const role = getPermSign(user)
        const roleName = getPermName({role:role})
        user = {...user, 'role':role, 'access':access_data.access}
        dispatch(login(user))


        if(user.first_logged){  //if it is a user, and it is his first login he must change default password unless he doesn't the mediator or other users can know his password because he will login with his email and phone number
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
        directTo(role,true)
        };
    const directTo = (role, withPop)=>{
        if(withPop)
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
        <article className="page lp" >
            <Header isLarge={true} unconnected={true}/>

            <h1 className="lp--title">Log-in<br/>{isMediator?<span>Mediator</span>:<div></div>}</h1>
            <form onSubmit={isMediator?submitHandlerMediator:submitHandlerUser} className="lp--form">
            {isMediator&&<TextInput 
                type="text"
                placeHolder="Username"
                onChange = {handleChange}
                name='username'
                value={formData.username}
                isValid={validity.isValid}
                warnText={validity.errorMsg}
            />}
            <TextInput 
                type="email"
                placeHolder="Email"
                onChange = {handleChange}
                name={isMediator?'email':'username'}
                value={isMediator?formData.email:formData.username}
                isValid={isMediator?true:validity.isValid}
                warnText={isMediator?'':validity.errorMsg}
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
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <label htmlFor="lp--checkbox">Disclaimer Lorem ispum dolor T&C <a href="#"> Link</a></label>
            </div>
                        
                <Button  text="Submit" size="small"/>
            </form> 
            <center>

                    <a href=""
                        onClick={event=>{
                            event.preventDefault()
                            isMediator ? setIsMediator(false): setIsMediator(true)

                            setValidity({isValid:true , errorMsg:''})
                        }}
                        style={{height:"10em"}}>
                        {loginHref}
                    </a>
            </center>
        </article>
)}
export default LoginPage