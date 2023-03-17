import "../styles/case_form_page.css"
import Header from "../components/general/Header"
import TextInput from "../components/general/TextInput"
import Button from "../components/general/Button"
import DropdownSelector from "../components/general/DropdownSelector.js"
import {useState} from "react"
import GrayBox from "../components/general/GrayBox"
import {MEDIATION_CHOICES} from '../utils/data'


const CaseFormPage = () =>{
    //Mock Id , to be replaced by backend
    const mediatorName = "Full Name"

    const [formData , setFormData] = useState({
        confName : "",
        confCategory  : "" , 
        confSubcategory : "" ,

    }) 

    const handleChange = (event)=>{
        const name = event.target.name
        const value  = event.target.value

        console.log(formData)

        setFormData(prevForm=>({
            ...prevForm,
            [name] : value
        }))
    }

    const handleSubmit = (event) => {
        event.reventDefault()
        //submit formData to api - Hen

    }


        return(
    
            <article className="cfp">
                <Header isLarge={false} />
                <center>
                    <form onSubmit={handleSubmit}>
                    <h1 className="cfp--title">New Case</h1>
                    <h2 >Mediator name</h2>
                    <h3 className="cfp--m-name">{mediatorName}</h3>
                    <h2 >Conflict name</h2>
                    <TextInput 
                    placeHolder="Free Text"
                    name="confName"
                    onChange={handleChange}
                     />   

                    <h2 >Choose a Category</h2>
                    <DropdownSelector 
                    placHolder="Select Areas of Mediation"
                     options={MEDIATION_CHOICES}
                     name="confSubcategory"
                     onChange={handleChange}
                     />


                    <h2 >Subcategory</h2>
                    <TextInput 
                    placeHolder="Free Text"
                    name="confSubcategory"
                    onChange={handleChange}
                     />

                     <GrayBox/>
                     
                    <Button size="small" text="Next"/>
                    </form>
                </center>
            </article>
        )


}

export default CaseFormPage