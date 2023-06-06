import Header from "../components/general/Header"
import TextArea from "../components/general/TextArea"
import DropdownSelector from "../components/general/DropdownSelector"
import TextInput from "../components/general/TextInput"
import Button from "../components/general/Button"

import { useRef,useState } from 'react'
import { MEDIATION_CHOICES } from '../utils/data'
import "../styles/pages/add_mediator_page.css"

const AddMediatorPage =({disable, goBack, handleChange,formData, handleSubmit, handleClick})=>{
   
    return(
    <article className="amp">
        <Header isLarge={true}/>
        <form>
            <h3>Add Mediator</h3>
            <h4>Relevant Experience</h4>
            <TextArea
               onChange={handleChange}
               value={formData?.relevant_experience }
               name='relevant_experience'
               
                
            />
            <DropdownSelector
                options={MEDIATION_CHOICES}
                placHolder="Select Areas of Mediation         "
                margin="1em 0 1em 0"
                onChange={handleChange}
                value={formData?.mediation_areas}
                name='mediation_areas'
                height="2em"
            />

            <TextInput
            limitChars={40}
                placeHolder="Education"
                align="left"
                altitude="1em"
                length="11em"
                name='education'
                value={formData?.education }
                onChange={handleChange}
                
            />
            <div 
                className="amp--certified"
                onClick={handleClick}
                style={{ color: formData?.certification_course === true? "var(--green-light)" : "var(--green-dark)" }}
            >
                <span className="material-symbols-outlined amp--certified-logo">
                    verified
                </span>
                <span className="amp--certified-text">
                    Negoflict Certified
                </span>   
                
            </div>

        </form>
        <footer>
            <Button 
                text="Back"
                size="small"
                margin="0.25em"
                onClick={goBack}
            />
            <Button 
                text="Create"
                size="small"
                margin="0.25em"
                onClick={handleSubmit}
                disabled={disable}
            />
        </footer>
    </article>)
}
export default AddMediatorPage