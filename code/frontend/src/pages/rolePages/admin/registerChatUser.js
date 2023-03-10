import { RegisterNewChatUser } from "../api_handler/server_to_agora.js";
import { useSelector } from "react-redux";


    const  RegisterChatUser = ()=>{
    const me = useSelector(state=>state.user)

    const [user,setUser] = useState({})

    const handleChange = ({currentTarget:input})=>{
        const {name,value} = input

        setUser(prevState=>({...prevState,[name]:value}))
    }

    const handleSubmit = (event)=>{
        event.preventDefault()
        const {username, password} = user

        const newUser =RegisterNewChatUser(me,username,password)
        console.log(newUser)
    }

    return(
        <div>
            <form
                onSubmit={handleSubmit}>
                    <input
                        type='text'
                        onChange={handleChange}
                        name='username'
                        placeholder="username"
                        />
                    <input
                        type='text'
                        onChange={handleChange}
                        name='password'
                        placeholder="password"
                        />

                    <button
                        type="submit">
                            <h3>submit</h3>
                        </button>
                </form> 

        </div>
    )
}
export default RegisterChatUser