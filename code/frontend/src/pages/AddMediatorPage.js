import Header from "../components/general/Header"
import TextArea from "../components/general/TextArea"
import DropdownSelector from "../components/general/DropdownSelector"
import TextInput from "../components/general/TextInput"
import Button from "../components/general/Button"

import { useRef,useState } from 'react'
import { MEDIATION_CHOICES } from '../utils/data'
import "../styles/pages/add_mediator_page.css"

const AddMediatorPage =()=>{
    const experienceRef=useRef('')
    const domainRef=useRef('')
    const educationRef=useRef('')
    const [isCertified, setIsCertified]=useState(false)


    const handleSubmit=()=>{
        const formData={
            experience: experienceRef.current?.value,
            mediationDomain: domainRef.current?.value,
            education: educationRef.current?.value,
            isCertified: isCertified,
        }
        console.log(formData)
        //Backend- connect to api
    }


    return(
    <article className="amp">
        <Header isLarge={true}/>
        <form>
            <h3>Add Mediator</h3>
            <h4>Relevant Experience</h4>
            <TextArea
                parentRef={experienceRef}
            />
            <DropdownSelector
                options={MEDIATION_CHOICES}
                placHolder="Select Areas of Mediation         "
                margin="1em 0 1em 0"
                parentRef={domainRef}
            />

            <TextInput
                placeHolder="Education"
                align="left"
                altitude="2.5em"
                parentRef={educationRef}
                
            />
            <div 
                className="amp--certified"
                onClick={()=>setIsCertified(prevState=>!prevState)}
                style={{color:isCertified?"var(--green-light)":"var(--green-dark)"}}
            >
                <span class="material-symbols-outlined amp--certified-logo">
                    verified
                </span>
                <span className="amp--certified-text">
                    Negoflict Mediation Course
                </span>   
                
            </div>

        </form>
        <footer>
            <Button 
                text="Back"
                size="small"
                margin="0.25em"
            />
            <Button 
                text="Create"
                size="small"
                margin="0.25em"
                onClick={handleSubmit}
            />
        </footer>
    </article>)
}
export default AddMediatorPage