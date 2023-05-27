import Button from "../general/Button"
import Header from "../general/Header"
import { useNavigate } from "react-router-dom"

const paragraphStyle ={
    width:"50%",
    minWidth:"var(--screen-minw)",
    padding:"0em 1em",
    boxSizing:"border-box"
 }


 const Unauthorised = ()=>{
    const navigate = useNavigate()
    

    return(
        <article  className="centerizer">
            <Header isLarge={true} unconnected={true} ></Header>
            <div style={{margin:'10px' , width:'50%'}} className="centerizer">
                <h1 style={{color:'darkgreen'}} className="title-large">No Access</h1>
                <p style={paragraphStyle } >
                    We're sorry, but you do not have the required permissions to access this page or resource.
                    This may be because you are not logged in, your account does not have the necessary privileges,
                    or you are attempting to access a restricted area. Please ensure that you have the correct access
                    rights and try again. If you believe you've encountered this message in error, please contact the application administrator or
                    support team for assistance. To return to the homepage, please click the button below, or if you are not logged in, you can visit
                    the login page to sign in with the appropriate credentials.
                </p>
            </div>
            <div style={{display:'flex', justifyContent:'space-around'}}>
                <Button onClick={()=>navigate(-1,{replace:true})} text='Go Back'size={'small'} margin='5px'/>
                <Button onClick={()=>navigate('/login')} text='Log In Page' size={'small'} margin='5px'/>
            </div>
        </article>
    )

}
export default Unauthorised