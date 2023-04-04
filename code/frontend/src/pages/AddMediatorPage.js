import Header from "../components/general/Header"
import TextArea from "../components/general/TextArea"
import DropdownSelector from "../components/general/DropdownSelector"
import TextInput from "../components/general/TextInput"
import Button from "../components/general/Button"
import { MEDIATION_CHOICES } from '../utils/data'
import "../styles/pages/add_mediator_page.css"

const AddMediatorPage =()=>{


    return(
    <article className="amp">
        <Header isLarge={true}/>
        <form>
            <h3>Add Mediator</h3>
            <h4>Relevant Experience</h4>
            <TextArea/>
            <DropdownSelector
                options={MEDIATION_CHOICES}
                placHolder="Select Areas of Mediation"
                name="mediationDomain"
            />
            <TextInput
                placeHolder="Education"
                align="left"
                altitude="2.5em"
            />
            <img name="Mediation approval" src=""/>
            <h6>Negoflict Mediation Course</h6>
        </form>
        <div>
            <Button 
                text="Back"
            />
            <Button 
                text="Create"
            />
        </div>
    </article>)
}
export default AddMediatorPage