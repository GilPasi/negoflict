import '../styles/pages/add_user_page.css'
import Header from '../components/general/Header.js'
import TextInput from '../components/general/TextInput.js'
import DropdownSelector from '../components/general/DropdownSelector.js'
import Button from '../components/general/Button.js'
import { AREA_CODES } from '../utils/data'




const AddUserPage =({side,idCase,goBack,
    next,handleSubmit,handleChange,
   userData,isMediator,window,disabled,options,errorMsg})=>{

   


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

        const validateForm =()=>{ // validate user properties           
          
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
                        <h2 className="aup--grid-row title centerizer" style={{color:"black"}}>
                            <span style={{
                                color:"var(--green-dark)",
                                fontWeight:"var(--weight-bold)",
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
                    limitChars={40}
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
                            altitude="0.5em"
                            align="left"
                            inGrid={true}
                        />
                    </div> 
                    <div className="aup--grid-row">
                        <TextInput
                        limitChars={40}
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
                        limitChars={40}
                            placeHolder="Email"
                            name="email"
                            value={userData?.email || ''}
                            onChange={handleChange}
                            length="100%"
                            align="left"
                            inGrid={true}
                            type="email"
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
                
                {!errorMsg&&
                <p>
                    {<span className='warning-to-plat'>{errorMsg}</span>}
                </p>
                }

                <nav>
                    <Button 
                        size="small"
                        text="Back"
                        margin="0.2em"
                        onClick={goBack}
                    />
                    {side === 'B'?(
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
                            disabled={disabled}
                        />
                    )}

                </nav>
    </article>
    )}

export default AddUserPage