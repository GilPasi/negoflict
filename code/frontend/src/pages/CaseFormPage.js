import "../styles/case_form_page.css"
import Header from "../components/general/Header"
import TextInput from "../components/general/TextInput"
import Button from "../components/general/Button"
import DropdownSelector from "../components/general/DropdownSelector.js"
import {useState} from "react"
import GrayBox from "../components/general/GrayBox"
import {MEDIATION_CHOICES} from '../utils/data'
import { useSelector } from "react-redux"
import useServer from "../hooks/useServer"
import { useNavigate } from "react-router-dom"


const CaseFormPage = () =>{
    const navigate = useNavigate()
    const {
        firstName,
        lastName,
        accessToken,
        id
        }= useSelector(state=>state.user)
  

    const { postNewCase } = useServer()

    const mediatorName = `${firstName} ${lastName}`


    const [formData , setFormData] = useState({}) 

    const handleChange = (event)=>{
        const {name, value} = event.target
        if(name === 'category'&& value === 'Select Areas of Mediation')
            value = null

        setFormData(prevForm=>({
            ...prevForm,
            [name] : value
        }))
       
    }

    const handleSubmit =async (event) => {
        event.preventDefault()
        const title = formData.title
        const category = formData.category
        const sub_category = formData.subcategory
        const problem_brief = formData.problem_brief


        const data = {
            title: title,
            mediator:id,
            category:category,
            sub_category:sub_category,
            problem_brief:problem_brief,
            access:accessToken,
        }

        const res = await postNewCase(data)
        if(res.status===201){
            const  caseId= res.data.id.slice(-7) 
        navigate(`/mediator/create_users/?side=A&id=${caseId}`,{
            replace:true,
        })

            }
            
        

        
     
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
                    name="title"
                    onChange={handleChange}
                     />   

                    <h2 >Choose a Category</h2>
                    <DropdownSelector 
                    placHolder="Select Areas of Mediation"
                     options={MEDIATION_CHOICES}
                     name="category"
                     onChange={handleChange}
                     />


                    <h2 >Subcategory</h2>
                    <TextInput 
                    placeHolder="Free Text"
                    name="subcategory"
                    onChange={handleChange}
                     />

                     <GrayBox onChange={handleChange}
                      withButtons={false}
                      name='problem_brief'
                      />
                     
                    <Button size="small" text="Next"/>
                    </form>
                </center>
            </article>
        )


}

export default CaseFormPage