import "../styles/pages/login_page.css"
import Header from "../components/general/Header"
import TextInput from "../components/general/TextInput"
import Button from '../components/general/Button'
import { useEffect, useRef, useState } from "react"
import useSubmit from "../hooks/useSubmit.js"
import { useDispatch,  } from 'react-redux'
import { login } from '../store/index'
import { useNavigate } from "react-router-dom"
import useServer from '../hooks/useServer'
import { useSelector } from "react-redux"
import useAlert from "../hooks/useAlert"
import { getPermSign } from "../utils/permissions"
import { useLazyLoginQuery, useLazyIs_loginQuery,useLazyLog_outQuery } from "../store/index"



const LoginPage=()=>{
    //dont change the order*******

    //hooks=====
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {GetJWTToken,LogOut, GetUserId} = useSubmit()
    const { verifyAccessToken } = useServer()
    const { bigSuccessAlert } = useAlert()
    //==========

    //state==========
    const [isMediator,setIsMediator] = useState(false)
    //===========
     

    //values========
    const loginHref = isMediator?'Login as User': 'Login as Mediator'
    const WasMounts = useRef(false)
    const { accessToken, role } = useSelector(state=>state.user)
    //==========
  
    //apiHooks=====
    const [fetchUser] = useLazyLoginQuery()
    const [fetch_is_login] = useLazyIs_loginQuery()
    const [fetch_logout] = useLazyLog_outQuery()
    //********

    useEffect(()=>{
        if(WasMounts.current)return
        isLogin()

    },[])

        
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
    }

    
    const [formData,setFormData] = useState({})

    const handleChange = ({currentTarget:input})=>{
        const {name,value} = input

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
          }))
    }

    const submitHandlerUser =async (event)=>{
        event.preventDefault()

        const {password, username} = formData


        const data = {password:`Negoflict${password}`, username:username}

        submitLogin(data)

    }
    


   const submitHandlerMediator =async (event)=>{
    event.preventDefault()

    submitLogin(formData)

}

    const submitLogin =async (data)=>{

    const {access} = await GetJWTToken(data)
    let user =await GetUserId(formData.username,access)
    const role = getPermSign(user)
    user = {...user, 'role':role, 'access':access}
    dispatch(login(user))

    const {data:d, error} =await fetchUser({username:formData.username,access:access})
    console.log('sore redux fetch>>>>>',d)
    console.log(error)


    setNullFields()

    directTo(role)
    
    }




    const directTo = (role)=>{
        bigSuccessAlert('Login successfuly')

        switch(role){
            case 1:{
                navigate('/admin')
                break;
            }
            case 2:{
                navigate('/mediator')
                break
            }
            case 3:{
                navigate('/user')
                break
            }
            default:
                navigate('/login')
        }

    }

    const setNullFields = ()=>[
        setFormData({})
    ]


    return(
        <article className="lp" >
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
                />):(<div></div>)}
                    


                    <TextInput 
                                type="email"
                                placeHolder="Email"
                                onChange = {handleChange}
                                name={isMediator?'email':'username'}
                            />

                    <TextInput 
                                type="password"
                                placeHolder="Password"
                                onChange = {handleChange}
                                name='password'
                            />
                            <div className="flexbox">
                                <input type="checkbox" id="lp--checkbox"/>
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