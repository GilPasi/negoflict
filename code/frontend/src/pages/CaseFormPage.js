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
import { useCreateNewGroupMutation, usePost_new_caseMutation,setBand } from '../store/index'
import { useDispatch } from "react-redux"
import useAlert from "../hooks/useAlert"
import Loader from "../components/general/Loader"


const CaseFormPage = () =>{
    //status = finished
    //dont change the order***************
    const dispatch = useDispatch()
    const {trigerNotification} = useAlert()
    //hooks=========
    const navigate = useNavigate()
    const [addGroup] = useCreateNewGroupMutation()
    const [addCase] = usePost_new_caseMutation()
    const [isFetching, setIsFetching] = useState(0)

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
        let {name, value} = event.target;

    
       
        const child = document.getElementById(`${name}_error`);
      
    
        if(child) 
            child.parentNode.removeChild(child);
        
        
        if(name === 'category' && value === 'Select Areas of Mediation')
            value = null;
        
        setFormData(prevForm=>({
            ...prevForm,
            [name] : value
        }));
    }
    
    const validateData = (data)=>{
       const keys = Object.keys(data)
       let is_valid = true
       keys.forEach(key=>{
        if(!data[key] || data[key].trim()==='' || data[key]===undefined){
            let label = document.createElement('label')
            label.style.position = 'absolute'
            label.style.left = '35%'
            label.style.margin = '0'
            label.style.color = 'red'
            label.style.marginTop = '-15px'
            label.style.translate = 'transform(-30%)'

           
            label.innerText = `${key} is missing`
            label.id = `${key}_error`
            document.getElementById(key).appendChild(label)
            is_valid = false
        }
       })
       return is_valid

    }

    const handleSubmit =async (event) => {
        event.preventDefault()
        if(!validateData(formData))return
        const {title,category,sub_category,problem_brief} = formData
     

      
        const data = {
            title: title.trim(),
            mediator:id,
            category:category.trim(),
            sub_category:sub_category.trim(),
            problem_brief:problem_brief.trim(),
            access:access,
            owner:username
        }
        dispatch(setBand({band_name:'BandCase', band_state:true}))
        setIsFetching(true)
        Promise.all([addGroup(data), addCase(data)])
        .then(()=>trigerNotification('created case and users','success'))
        .catch(()=>trigerNotification('unable to create the users for that case.','error'))
        .finally(()=>dispatch(setBand({band_name:'BandCase', band_state:false})))
         
        navigate(-1,{replace:true})
    }

    


        return(
            <div>
                 {isFetching &&
        <div style={{position:'fixed',zIndex:'100',width:'100%',height:'100%',opacity:'0.6',backgroundColor:'gray'}}>
          <Loader withLogo={true} size={'medium'}/>
        </div>
        }
            
            
            <article className="cfp page">
                <Header isLarge={false} />
                    <form onSubmit={handleSubmit} className="centerizer">
                        <h1 className="cfp--title">New Case</h1>
                        <h2 className="cfp--h2">Mediator name</h2>
                        <h3 className="cfp--m-name">{mediatorName}</h3>
                        <h2 className="cfp--h2">Conflict name</h2>
                        <TextInput
                            id='title' 
                            placeHolder="Free Text"
                            name="title"
                            onChange={handleChange}
                        />   

                        <h2 className="cfp--h2">Choose a Category</h2>

                        <DropdownSelector 
                            id='category'
                            placHolder="Select Areas of Mediation"
                            options={MEDIATION_CHOICES}
                            name="category"
                            onChange={handleChange}
                            height='2em'
                            margin="25px"
                        />

                        <h2 className="cfp--h2">Subcategory</h2>
                        <TextInput
                            id='sub_category' 
                            placeHolder="Free Text"
                            name="sub_category"
                            onChange={handleChange}
                        />

                        <TextArea onChange={handleChange}
                            id='problem_brief'
                            withButtons={false}
                            name='problem_brief'
                            title="The problem"
                        />
                        
                        <Button size="small" text="Next" disabled={!isFilled}/>
                    </form>
            </article>
            </div>
        )


}

export default CaseFormPage