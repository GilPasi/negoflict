import "../styles/login_page.css"
import Header from "../components/general/Header"
import TextInput from "../components/general/TextInput"
import Button from '../components/general/Button'
import { useEffect, useState } from "react"
import useSubmit from "../hooks/useSubmit.js"
import { useDispatch,  } from 'react-redux'
import { login } from '../store/index'
import { useNavigate } from "react-router-dom"










const LoginPage=()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {GetJWTToken, ValidateEmail,LogOut, GetRole, GetUserId} = useSubmit()
    const [isMediator,setIsMediator] = useState(false)




    
    useEffect(()=>{
        LogOut()
    },[])

    

   
    
    
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
    const validEmail =await ValidateEmail(formData.email)

    if(!validEmail)
        return

    submitLogin(formData)

}

    const submitLogin =async (data)=>{

    const {refresh,access} = await GetJWTToken(data)
    const {id,first_name, last_name} =await GetUserId(formData.username,access)
    const role = await GetRole(id,access)
    

    const {username,email} = formData
    dispatch(login({
        id:id,
        firstName:first_name,
        username:username,
        email:email,
        refreshToken:refresh,
        accessToken:access,
        role:role,
        lastName:last_name,
    }))
    setNullFields()
    
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
        <div className="lp" >
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
                                placeHolder={isMediator?"Password":'Phone number'}
                                onChange = {handleChange}
                                name='password'
                            />
                            <div className="flexbox">
                                <input type="checkbox" id="lp--checkbox"/>
                                <label htmlFor="lp--checkbox">Disclaimer Lorem ispum dolor T&C <a href="#"> Link</a></label>
                            </div>
                            <div>
                                <label style={{padding:'10px'}}>
                                <a href="" onClick={event=>{
                                    event.preventDefault()

                                    isMediator?setIsMediator(false):setIsMediator(true)

                                }}>Login as Mediator </a>
                                </label>
                            </div>
                    <Button  text="Submit" size="small"/>
                </form> 

               

            </div>
        </div>
)}
export default LoginPage