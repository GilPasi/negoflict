import '../styles/pages/add_user_page.css'
import Header from '../components/general/Header.js'
import ToolBar from '../components/general/ToolBar.js'
import TextInput from '../components/general/TextInput.js'
import DropdownSelector from '../components/general/DropdownSelector.js'
import Button from '../components/general/Button.js'
import { AREA_CODES , ISR_RESIDENCE } from '../utils/data'




const AddUserPage =({side,idCase, goBack, next,
     handleSubmit, handleChange, userData,isMediator, disabled})=>{

        return(

        <article className="aup">
                    <Header/>
                    {!isMediator&&<ToolBar conflictName="A political conflict" id={idCase}/>}
                <form className="aup--grid">
                {isMediator ?
                    (
                        <h2 className="aup--grid-row" id="aup--m-title">
                            <span style={{
                                color:"var(--green-dark)",
                                fontWeight:"var(--weight-bold)"
                                }}>Add Mediator</span><br/>
                                Mediator personal details
                        </h2>
                    ):(
                    <h2 className="aup--title aup--grid-row">
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
                            onClick={next}
                        />
                        )
                    }


                </nav>
    </article>
    )}

export default AddUserPage