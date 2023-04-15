import TextInput from './TextInput'
import DropdownSelector from './DropdownSelector'
import { AREA_CODES } from '../../utils/data'
import '../../styles/pages/add_user_page.css'

const UserForm = ({userData, handleChange, required})=>{

    return(
        <div>
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
                            required={required}
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
                            required={required}

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
                            required={required}
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
                            required={required}
                        />
                        </div>

                    </div>

    )

}

export default UserForm