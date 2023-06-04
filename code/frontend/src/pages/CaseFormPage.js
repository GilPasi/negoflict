import "../styles/pages/case_form_page.css"
import Header from "../components/general/Header"
import TextInput from "../components/general/TextInput"
import Button from "../components/general/Button"
import DropdownSelector from "../components/general/DropdownSelector.js"
import Dropdown from "../components/general/Dropdown.js"

import { useState , useEffect} from "react"
import TextArea from "../components/general/TextArea"
import {MEDIATION_CHOICES} from '../utils/data'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useCreateNewGroupMutation, usePost_new_caseMutation,setBand, useDeleteCaseMutation,useDeleteGroupMutation } from '../store/index'
import { useDispatch } from "react-redux"
import useAlert from "../hooks/useAlert"
import Loader from "../components/general/Loader"
import useValidateData from "../hooks/useValidate"


const CaseFormPage = () =>{
    //status = finished
    //dont change the order***************
    const dispatch = useDispatch()
    const {trigerNotification,deletAlert} = useAlert()
    const {validateData,clearValidate} = useValidateData()
    //hooks=========
    const navigate = useNavigate()
    const [addGroup] = useCreateNewGroupMutation()
    const [addCase] = usePost_new_caseMutation()
    const [deleteCase] = useDeleteCaseMutation()
    const [deleteGroups] = useDeleteGroupMutation()
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


        clearValidate(name)

        if(name === 'category' && value === 'Select Areas of Mediation')
            value = null;
        
        setFormData(prevForm=>({
            ...prevForm,
            [name] : value
        }));
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
        .then((values) => {
            const errors = values.filter(value => value.error);
            if (errors.length > 0) {
                trigerNotification('unable to create the users for that case.','error');
                let caseId
                let groups

                const dataVal = values.filter(value => value.data);
                console.log('data',dataVal)

                dataVal.forEach(val=>{
                    if(val.data.hasOwnProperty('AgoraResponse'))
                        groups = val.data.AgoraResponse
                    else if(val.data.hasOwnProperty('case'))
                        caseId = val.data.case.id
                })

                handleErrors({errors,caseId,groups})
            } else {
                trigerNotification('created case and users','success');
                navigateTo()
            }

         
            
        })
        .finally(()=>dispatch(setBand({band_name:'BandCase', band_state:false})));

         
       
    }
    const navigateTo = ()=>{
        navigate(-1,{replace:true})
    }

    const handleErrors =async ({errors, caseId, groups})=>{
        let make_action = true
        console.log('in errrorooror')

        if(errors.length > 1){
            make_action = false
        }
        console.log(errors)
        
       await errors.forEach(async (errorItem) => {
            if (errorItem.error.data.hasOwnProperty('agora')) {
               if(errorItem.error.data.description.includes('403 Client Error: Forbidden for url'))
                   await deletAlert({'confirmText':'you have reached the maximum number of cases that can be created. \n In order to create additional cases, you will need to undertake one of the following actions:\n 1.Contact our admin team\n 2.Delete or resolve some of your existing cases to make room for new ones.',
                    'icon':'error'})

                
                   
                if(make_action && caseId)
                     deleteCase({caseId:caseId})
                    
                    

       
              console.log("Agora error: ", errorItem.error.data.agora);
            } else if (errorItem.error.data.hasOwnProperty('title')) {
                if(make_action && groups){
                    console.log(groups)
                    let groupIds =  Object.values(groups).map(item => Object.values(item)[0].data);
                    console.log('filter',groupIds)
                    deleteGroups({groupS:groupIds})
                }
              console.log("Title error: ", errorItem.error.data.title);
            }
        })

        navigateTo()
    }

        return(
            <div>
                {isFetching &&
                    <div style={{position:'fixed',zIndex:'100',width:'100%',height:'100%',opacity:'0.6',backgroundColor:'gray'}}>
                        <Loader withLogo={true} size={'medium'}/>
                    </div>}
            
            
                <article className="cfp page">
                    <Header isLarge={false} />
                        <form onSubmit={handleSubmit} className="centerizer">
                            <h2 className="cfp--h2">Mediator Name</h2>
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