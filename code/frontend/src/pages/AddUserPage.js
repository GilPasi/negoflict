import '../styles/add_user_page.css'
import Header from '../components/general/Header.js'
import ToolBar from '../components/general/ToolBar.js'
import TextInput from '../components/general/TextInput.js'
import DropdownSelector from '../components/general/DropdownSelector.js'
import Button from '../components/general/Button.js'

import {useState} from "react"

const AddUserPage =({side})=>{

    const id = 100777

    const [userData , setUserData] = useState({
        firstName: "",
        lastName: "" ,
        phonePrefix: "",
        phoneNumber: "" ,
        email: ""  
    })

    const handleChange = (event)=>{
        const name = event.target.name
        const value = event.target.value
        setUserData(prevState=>({
            ...prevState,
            [name] : value
        }))
    }

    //Backend:

    const handleSubmit=(event)=>{
        event.preventDefault()


    }
    

        return(

        <article className="aup centerizer">
                    <Header size={"small"}/>
                    <ToolBar conflictName="A political conflict" id={id}/>

                <form className="aup--grid">
                 <h2 className="aup--title">Party {side}</h2>
                    <div className="aup--grid-row">
                        <TextInput
                            placeHolder="First Name"
                            name="firstName"
                            value={userData.firstName}
                            onChange={handleChange}
                            length="100%"
                            align="left"
                            />
                    </div>

                    <div className="aup--grid-row">
                        <TextInput
                            placeHolder="Last Name"
                            name="lastName"
                            value={userData.lastName}
                            onChange={handleChange}
                            length="100%"
                            align="left"

                        />
                    </div>

                    <div className="aup--grid-phone-prefix">
                        <DropdownSelector 
                            placHolder="+972"
                            isDefault={true}
                            options={["+1" , "+7"]}
                            name="phonePrefix"
                            value={userData.phonePrefix}
                            onChange={handleChange}
                            align="left"
                            />
                    </div>

                    <div className="aup--grid-phone-number">
                        <TextInput
                        placeHolder="Phone"
                        name="phoneNumber"
                        value={userData.phoneNumber}
                        onChange={handleChange}
                        length="100%"
                        altitude="0.5em"
                        type="tel"
                        align="left"
                        />
                    </div>

                    <div className="aup--grid-row">
                        <TextInput
                            placeHolder="Email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            length="100%"
                            align="left"
                        />
                    </div>
                </form>

                <nav>
                    <Button 
                        size="small"
                        text="Back"
                        margin="0.2em"
                    />
                    <Button 
                        size="small"
                        text="Next"
                        margin="0.2em"
                        type="submit"
                        onClick={handleSubmit}

                    />


                </nav>
    </article>
    )}

export default AddUserPage