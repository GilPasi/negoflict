import '../../styles/pages/add_user_page.css'
import TextInput from '../../components/general/TextInput.js'
import DropdownSelector from '../../components/general/DropdownSelector.js'
import { AREA_CODES } from '../../utils/data'



const UserForm =({
        handleChange,
    userData,errorMsg})=>{

  
    return(
            <article className="centerizer" >
                <div className="aup--grid">
                    <div className="aup--grid-row">
                        <TextInput
                            limitChars={40}
                            id='first_name'
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
                            limitChars={40}
                            id='last_name'
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
                            size="0.5em"
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
                          
                            id='phoneNumber'
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
                            id='email'
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
                </div>
                
                {!errorMsg&&
                <p  >
                    {<span className='warning-to-plat'>{errorMsg}</span>}
                </p>}
    </article>
    )
    
}

export default UserForm