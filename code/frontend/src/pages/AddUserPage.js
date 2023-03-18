import '../styles/add_user_page.css'
import Header from '../components/general/Header.js'
import ToolBar from '../components/general/ToolBar.js'
import TextInput from '../components/general/TextInput.js'
import DropdownSelector from '../components/general/DropdownSelector.js'
import Button from '../components/general/Button.js'
import { AREA_CODES } from '../utils/data'
import { useLocation, useNavigate } from 'react-router-dom'
import useNodeS from '../hooks/useNodeS'
import useSubmit from '../hooks/useSubmit'

import {useEffect, useState} from "react"
import { current } from '@reduxjs/toolkit'

const AddUserPage =({side,idCase})=>{
    const location = useLocation()
    const navigate = useNavigate()
    const queryParam = new URLSearchParams(location.search)
    const [prevUser,setPrevUser] = useState({})
    const [userData , setUserData] = useState({})
    const { registerManyUsers } = useNodeS()
    const { GetNewAccessToken } = useSubmit()

    side = side?side:queryParam.get('side')
    const id = idCase?idCase:queryParam.get('id')

    

    useEffect(()=>{
        const state = location.state
        const prev = state?.prev?.prev ?? {}
        const current = 
        state?.prev?.current ?? {}
        
        const temp = prev
        setPrevUser(current)
        setUserData(temp)

        console.log('current'+current)
        console.log('prev'+prev)
    },[side])

    
    
    


    const handleChange = (event)=>{
        const {name, value} = event.target
        setUserData(prevState=>({
            ...prevState,
            [name] : value
        }))
    }
    console.log('prevvvvvvv')
    console.log(prevUser)

    const handleSubmit =async ()=>{
        if(!prevUser){
            console.log('data from user A not forwarded')
            return
        }
        // const users =[prevUser, userData]
        // const newAccess =await GetNewAccessToken()

        // setTimeout(()=>{
        //     registerManyUsers(users,newAccess)
        // },0)
        
    }

    const  next= event=>{
        event.preventDefault()
        console.log('nexxxttt')
        console.log(userData)
        navigate(`/mediator/add_user/?side=B&id=${id}`,{
            state:{
                prev:prevUser,
                current:userData}
        })
    }
    const goBack = event=>{
        event.preventDefault()
        navigate(-1,{
            state:{
                prev:prevUser,
                current:userData}
        })
        

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
                            value={userData.firstName || ''}
                            onChange={handleChange}
                            length="100%"
                            align="left"
                            />
                    </div>

                    <div className="aup--grid-row">
                        <TextInput
                            placeHolder="Last Name"
                            name="lastName"
                            value={userData.lastName || ''}
                            onChange={handleChange}
                            length="100%"
                            align="left"

                        />
                    </div>

                    <div className="aup--grid-phone-prefix">
                        <DropdownSelector 
                            placHolder="--"
                            isDefault={true}
                            options={AREA_CODES}
                            name="phonePrefix"
                            value={userData.phonePrefix || ''}
                            onChange={handleChange}
                            align="left"
                            />
                    </div>

                    <div className="aup--grid-phone-number">
                        <TextInput
                        placeHolder="Phone"
                        name="phoneNumber"
                        value={userData.phoneNumber || ''}
                        onChange={handleChange}
                        length="100%"
                        altitude="2em"
                        type="number"
                        align="left"
                        />
                    </div>

                    <div className="aup--grid-row">
                        <TextInput
                            placeHolder="Email"
                            name="email"
                            value={userData.email || ''}
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
                        onClick={goBack}
                    />
                    {
                        side === 'B'?(
                            <Button
                                size='small'
                                text='Create case'
                                type='submit'
                                onClick={handleSubmit}
                                margin='0.2em'
                                color='#09680b'
                            />
                        ):(
                        <Button 
                            size="small"
                            text="Next"
                            margin="0.2em"
                            type="submit"
                            onClick={next}
                        />
                        )
                    }


                </nav>
    </article>
    )}

export default AddUserPage