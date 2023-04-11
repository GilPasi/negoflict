import '../styles/pages/add_user_page.css'
import Header from '../components/general/Header.js'
import ToolBar from '../components/general/ToolBar.js'
import TextInput from '../components/general/TextInput.js'
import DropdownSelector from '../components/general/DropdownSelector.js'
import Button from '../components/general/Button.js'
import { AREA_CODES , ISR_RESIDENCE } from '../utils/data'



const AddUserPage =(props)=>{


        const {side,idCase,goBack,
             next,handleSubmit,handleChange,
            userData,isMediator,isWindow , disabled} = props

        const windowStyle={
                fontSize:'0.85em' ,                 
            }

        const validateForm =()=>{
            let valid = false
            //Validate the form (Hen)
            if(valid)
                next()
            else
                document.querySelector('#aup--w').style.visibility = 'visible'
        }

        return(

        <article className="aup" style={isWindow&&windowStyle}>
            {!isWindow&&<header>
                    <Header/>
                    {!isMediator&&<ToolBar conflictName="A political conflict" id={idCase}/>}
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

                        />
                    </div>

                    <div className="aup--grid-phone-prefix">
                        <DropdownSelector 
                            placHolder="--"
                            isDefault={true}
                            options={AREA_CODES}
                            name="phonePrefix"
                            value={userData?.phonePrefix || ''}
                            onChange={handleChange}
                            align="left"
                            width="100%"
                            height="2em"
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
                        />
                    </div>
                    {isMediator&&
                    <div className="aup--grid-row">
                        <DropdownSelector 
                            placHolder="Residence"
                            isDefault={true}
                            options={ISR_RESIDENCE}
                            name="phonePrefix"
                            value={userData?.phonePrefix || ''}
                            onChange={handleChange}
                            align="left"
                            width="100%"
                            height="2em"
                            />
                    </div>
                    }

                </form>
                    <p className='warning' id='aup--w'>Some of the details are not valid</p>

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