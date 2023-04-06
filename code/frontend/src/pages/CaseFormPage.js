import "../styles/pages/case_form_page.css"
import Header from "../components/general/Header"
import TextInput from "../components/general/TextInput"
import Button from "../components/general/Button"
import DropdownSelector from "../components/general/DropdownSelector.js"
import { useState} from "react"
import TextArea from "../components/general/TextArea"
import {MEDIATION_CHOICES} from '../utils/data'
import { useSelector } from "react-redux"
import useServer from "../hooks/useServer"
import { useNavigate } from "react-router-dom"
import { addChatGroups, useCreateNewGroupMutation, usePost_new_caseMutation } from '../store/index'
import { useDispatch } from "react-redux"

const CaseFormPage = () =>{
    //hooks=========
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { postNewCase } = useServer()
    const [addGroup, resultGroup] = useCreateNewGroupMutation()
    const [addCase, resultCase] = usePost_new_caseMutation()
    //===========

    //values========
    const {
        firstName,
        lastName,
        id,
        username,
        access,
        }= useSelector(state=>state.user)

    const mediatorName = `${firstName} ${lastName}`
    //state========
    const [formData , setFormData] = useState({})
     
    //===========
   

    //handles=======
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
        .then(res=>dispatch(addChatGroups(res.data.AgoraResponse)))
        addCase(data).then(res=>{
            

        })

        
    
        
        
        // if(res.status===201){
        //     const  dataCase= res.data.case.id
        //     const  caseId = dataCase.slice(-7)
        // navigate(`/mediator/create_users/?side=A&id=${caseId}`,{
        //     replace:true,
        //     state:{dataCase, groupArr},
        // })
        //     }
    }


        return(
    
            <article className="cfp">
                <Header isLarge={false} />
                    <form onSubmit={handleSubmit} className="aligner">
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
                            height={{height:"2em"}}
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
                        />
                        
                        <Button size="small" text="Next"/>
                    </form>
            </article>
        )


}

export default CaseFormPage