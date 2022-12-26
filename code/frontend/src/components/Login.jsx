import React from "react";
import axios, { Axios } from 'axios'
import { useState } from "react";
import "./Login.css";

const Login = () => {
  const JWTCheck = localStorage.getItem('token')
  const [user,setUser] = useState('')
  const [pass,setPass] = useState('')
  const [JWT,setJWT] = useState(JWTCheck || null)
  const [me, setMe] = useState([])
  const [myUseR, setMyUser] = useState(null)


  

const loginIn = ()=>{
  axios.post('http://localhost:8000/auth/jwt/create',{
    username: user,
    password: pass,
  }).then(token=>{
    localStorage.setItem('token',token.data.access)
    setJWT(localStorage.getItem('token'))
  })
  .catch(err=>console.log(err))
}


const logOut = ()=>{
  setJWT(null)
  localStorage.removeItem('token')
}



const mediator = ()=>{
  axios.get('http://localhost:8000/mediator_view/',{
    headers: {Authorization: `JWT ${JWT}`} 
  })
  .then(res=>setMe(res.data))
}

const myUser = ()=>{
  axios.get('http://localhost:8000/auth/users/me/',{
    headers: {Authorization: `JWT ${JWT}`} 
  }).then(res=>{
    setMyUser(res.data)
    console.log(res.data)
  },{})



}

const handlerChange = ({currentTarget: input}) =>{
  if(input.name === 'username')
    setUser(input.value)
  else if(input.name === 'password')
        setPass(input.value)
}
  return (
    <div className="login-page">
      <div className="form" >
        {JWT==null?(
          <div>
            <input name='username' type="text" placeholder="username" onChange={handlerChange}/>
            <input name='password' type="password" placeholder="password" onChange={handlerChange} />
            <button onClick={loginIn}>login</button>
            <p className="message">
              Not registered? <a href="#">Create an account</a>
            </p>
          </div>
        )
        :(
          <div>
        <h1>hello</h1>
        <button onClick={mediator}>mediators</button>
        <button onClick={myUser}>me</button>

        <button onClick={logOut}>Logout</button>
        <h1>
          {me.map(res=>(<h1 key={res.id}>{res.id}</h1>))}
        </h1>
          {myUseR!=null?(
            <div>
             <h1>{myUseR.id}</h1>
             <h1>{myUseR.email}</h1>
             <h1>{myUseR.first_name}</h1>
             <h1>{myUseR.last_name}</h1>
             </div>

                                    ):(<h1></h1>)}
       

      

        </div>)
}
        
      </div>
    </div>
  );
};
export default Login;
