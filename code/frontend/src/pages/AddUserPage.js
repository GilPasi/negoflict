import '../styles/add_user_page.css'
import Header from '../components/general/Header.js'
import ToolBar from '../components/general/ToolBar.js'
import TextInput from '../components/general/TextInput.js'
import DropdownSelector from '../components/general/DropdownSelector.js'
import Button from '../components/general/Button.js'
import { AREA_CODES } from '../utils/data'




const AddUserPage =({side,idCase, goBack, next, handleSubmit, handleChange, userData})=>{
   
    



 
        return(

        <article className="aup centerizer">
                    <Header size={"small"}/>
                    <ToolBar conflictName="A political conflict" id={idCase}/>

                <form className="aup--grid">
                 <h2 className="aup--title">Party {side}</h2>
                    <div className="aup--grid-row">
                    <TextInput
                            placeHolder="User name"
                            name="username"
                            value={userData?.username || ''}
                            onChange={handleChange}
                            length="100%"
                            align="left"
                            />
                    </div>
                    <div className="aup--grid-row">
                   
                        <TextInput
                            placeHolder="First Name"
                            name="firstName"
                            value={userData?.firstName || ''}
                            onChange={handleChange}
                            length="100%"
                            align="left"
                            />
                    </div>

                    <div className="aup--grid-row">
                        <TextInput
                            placeHolder="Last Name"
                            name="lastName"
                            value={userData?.lastName || ''}
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