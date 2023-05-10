import '../styles/pages/add_user_page.css'
import Header from '../components/general/Header.js'
import TextInput from '../components/general/TextInput.js'
import DropdownSelector from '../components/general/DropdownSelector.js'
import Button from '../components/general/Button.js'
import {useState} from 'react'
import { AREA_CODES } from '../utils/data'
import { useLazyIsEmailExistQuery, useLazyIsUsernameExistQuery } from '../store'



const AddUserPage =({side,idCase,goBack,
    next,handleSubmit,handleChange,
   userData,isMediator,window,disabled,options})=>{

    const [isEmailValid] = useLazyIsEmailExistQuery()
    const [isUsernameValid] = useLazyIsUsernameExistQuery()

    const [validity , setValidity] = useState({isValid: true, errMsg: ''}) 


    let _fontSize = ''

      switch(window){
        case 'large':
            _fontSize = '0.85em'
            break
        case 'small':
            _fontSize = '0.5em'

      }

        const windowStyle={fontSize:_fontSize,}
        const dropdownSize = window

        const validateForm =async()=>{ // validate user properties           
            //___ 1. check if all fields are treated ___
            
            console.log(userData)
            
            for(const dataField in userData){
                if(dataField === ''){
                    setValidity({isValid:false, errMsg:"Please address all fields"})
                    return
                }
            }
            
            //___ 2. check if the email is not occupied ___
            
            const email = userData?.email ?? null
            const username = userData?.username ?? null
            const phone = userData?.phoneNumber ?? null
            const firstName = userData?.first_name ?? null
            const lastName = userData?.last_name ?? null
            
            if(!(email && username && phone && firstName && lastName)){
                setValidity({isValid:false, errMsg:"Something went wrong, please try again later"})
                return
            }
            
            
            if(isMediator){
               const {data:usernameExistData, error:usernameExistError} =await isUsernameValid({username:username})
               if(usernameExistError){
                console.log('something went wrong',emailExistError)
                return
               }
               if(usernameExistData===true){
                setValidity({isValid:false, errMsg:'User name is already taken'})
                return
               }
                
            }
            const {data:emailExistData, error:emailExistError}=await isEmailValid({email:email})
            if(emailExistData){
                console.log('something went wrong',emailExistError)
                return
            }
            if(emailExistData===true){
                setValidity({isValid:false, errMsg:'Email is already taken'})
                return
            }
            
        next()
        }

        return(

        <article className="aup" style={window&&windowStyle}>

            {!window&&<header className='aup--header'>
                    <Header/>
            </header>}


                <form className="aup--grid">
                {isMediator ?
                    (
                        <h2 className="aup--grid-row" id="aup--m-title" >
                            <span style={{
                                color:"var(--green-dark)",
                                fontWeight:"var(--weight-bold)"
                                }}>Add Mediator</span><br/>
                                Mediator personal details
                        </h2>
                    ):(
                    <h2 className="aup--title aup--grid-row" >
                        Party {side}
                    </h2>)
                }
                {isMediator&&
                 <div className="aup--grid-row">
                 <TextInput
                     placeHolder="Username"
                     name="username"
                     value={userData?.username || ''}
                     onChange={handleChange}
                     length="100%"
                     align="left"
                     inGrid={true}
                    
                 />
             </div>
                }
                  
                    <div className="aup--grid-row">
                        <TextInput
                            placeHolder="First Name"
                            name="first_name"
                            value={userData?.first_name || ''}
                            onChange={handleChange}
                            length="100%"
                            height="0.5em"
                            altitude="0.5em"
                            align="left"
                            inGrid={true}
        
                        />
                    </div>
 
                    <div className="aup--grid-row">
                        <TextInput
                            placeHolder="Last Name"
                            name="last_name"
                            value={userData?.last_name || ''}
                            onChange={handleChange}
                            length="100%"
                            align="left"
                            inGrid={true}

                        />
                    </div>

                    <div className="aup--grid-phone-prefix">
                        <DropdownSelector 
                            size={dropdownSize}
                            placHolder="--"
                            isDefault={true}
                            options={AREA_CODES}
                            name="phonePrefix"
                            value={userData?.phonePrefix || ''}
                            onChange={handleChange}
                            width="100%"
                            height="2.25em"
                            />
                    </div>

                    <div className="aup--grid-phone-number">
                        <TextInput
                            placeHolder="Phone"
                            name="phoneNumber"
                            value={userData?.phoneNumber || ''}
                            onChange={handleChange}
                            length="100%"
                            altitude="2em"
                            type="number"
                            align="left"
                            onmousewheel="return false;"
                            inGrid={true}
                        />
                    </div> 

                    <div className="aup--grid-row">
                        <TextInput
                            placeHolder="Email"
                            name="email"
                            value={userData?.email || ''}
                            onChange={handleChange}
                            length="100%"
                            align="left"
                            inGrid={true}
                        />

                    </div>
                    {isMediator&&
                    <div className="aup--grid-row">
                        <DropdownSelector 
                            placHolder="Residence"
                            isDefault={true}
                            options={options} //CHANGE HERE TO FETCH
                            name="city"
                            value={userData?.phonePrefix || ''}
                            onChange={handleChange}
                            align="left"
                            width="100%"
                            height="2em"
                            valType='city'
                            />
                    </div>
                    }

                </form>
                
                <p className='warning'>{!validity.isValid&&<span>{validity.errMsg}</span>}</p>

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
                                disabled={disabled}
                            />
                        ):(
                        <Button 
                            size="small"
                            text="Next"
                            margin="0.2em"
                            type="submit"
                            onClick={validateForm}
                        />
                        )
                    }

                </nav>
    </article>
    )}

export default AddUserPage