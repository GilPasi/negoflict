import "../styles/pages/case_form_page.css"
import Header from "../components/general/Header"
import TextInput from "../components/general/TextInput"
import Button from "../components/general/Button"
import DropdownSelector from "../components/general/DropdownSelector.js"
import { useState , useEffect} from "react"
import TextArea from "../components/general/TextArea"
import {MEDIATION_CHOICES} from '../utils/data'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useCreateNewGroupMutation, usePost_new_caseMutation } from '../store/index'


const CaseFormPage = () =>{
    //status = finished
    //dont change the order***************
    //hooks=========
    const navigate = useNavigate()
    const [addGroup] = useCreateNewGroupMutation()
    const [addCase] = usePost_new_caseMutation()
    //===========

    //values========
    const {
        first_name,
        last_name,
        id,
        username,
        access,
        }= useSelector(state=>state.user)

    const mediatorName = `${first_name} ${last_name}`
    //state========
    let formTemplate ={
        title:'',
        category:'',
        sub_category:'',
        problem_brief: '',
    }
    const [formData , setFormData] = useState(formTemplate)
     const [isFilled , setIsFilled] = useState(false) 
    //===========
    useEffect(()=>{
        for(const field in formData)
            if(formData[field] === '' || formData[field] === null){
                setIsFilled(false)
                return   
        }
        setIsFilled(true)
    },[formData])

    //****************
   

    //handlers=======
    const handleChange = event =>{
        let {name, value} = event.target
        
        if(name === 'category'&& value === 'Select Areas of Mediation')
            value = null
        
        setFormData(prevForm=>({
            ...prevForm,
            [name] : value
        }))
    }

    const handleSubmit =async (event) => {
        event.preventDefault()
        const {title,category,sub_category,problem_brief} = formData
      
        const data = {
            title: title,
            mediator:id,
            category:category,
            sub_category:sub_category,
            problem_brief:problem_brief,
            access:access,
            owner:username
        }
        addGroup(data)
        addCase(data)
        navigate(-1,{replace:true})
    }


        return(
    
            <article className="cfp page">
                <Header isLarge={false} />
                    <form onSubmit={handleSubmit} className="centerizer">
                        <h1 className="cfp--title">New Case</h1>
                        <h2 className="cfp--h2">Mediator name</h2>
                        <h3 className="cfp--m-name">{mediatorName}</h3>
                        <h2 className="cfp--h2">Conflict name</h2>
                        <TextInput 
                            placeHolder="Free Text"
                            name="title"
                            onChange={handleChange}
                        />   

                        <h2 className="cfp--h2">Choose a Category</h2>

                        <DropdownSelector 
                            placHolder="Select Areas of Mediation"
                            options={MEDIATION_CHOICES}
                            name="category"
                            onChange={handleChange}
                            height='2em'
                            margin="25px"
                        />

                        <h2 className="cfp--h2">Subcategory</h2>
                        <TextInput 
                            placeHolder="Free Text"
                            name="sub_category"
                            onChange={handleChange}
                        />

                        <TextArea onChange={handleChange}
                            withButtons={false}
                            name='problem_brief'
                            title="The problem"
                        />
                        
                        <Button size="small" text="Next" disabled={!isFilled}/>
                    </form>
            </article>
        )


}

export default CaseFormPage