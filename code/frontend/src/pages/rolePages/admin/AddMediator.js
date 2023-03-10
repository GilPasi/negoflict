import React from "react"
import Header from '../../../components/general/Header'
import TextInput from '../../../components/general/TextInput'
import { useState } from "react"
import Button from "../../../components/general/Button"



 const AddMediator = ()=>{
    const [mediator,setMediator] = useState({})
    const options = [
        {value:1,label:'hen'},
        {value:2,label:'lala'},
        {value:3,label:'noy'}
    ]

    const optionGenerator = () => {
        return options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ));
      };



    const handleChange = ({currentTarget:input})=>{
        const {name, value}= input

        setMediator(prevState=>({
            ...prevState,[name]:value,
        }))
    }

    const handleSubmit = ()=>{

    }


    return(
        <div>
            <Header isLarge={true}/>

            <p>
                <h1>add mediator</h1>
            </p>
            <p>
                <h3>Mediator personal details</h3>
            </p>
            <form>
                <input
                            type='text'
                            placeHolder='First Name'
                            onChange={handleChange}
                            name='first_name'
                        />
                <input
                            type='text'
                            placeHolder='Last Name'
                            onChange={handleChange}
                            name='last_name'
                        />
                <input
                            type='number'
                            placeHolder='Phone'
                            onChange={handleChange}
                            name='phone'
                        />
                <input
                            type='email'
                            placeHolder='Email'
                            onChange={handleChange}
                            name='email'
                        />
                <input
                            type='text'
                            placeHolder='City'
                            onChange={handleChange}
                            name='city'
                        />
                <input
                            type='text'
                            placeholder="Street"
                            onChange={handleChange}
                            name='street'
                        />
                <textarea
                            type='textbox'
                            placeHolder='300 characters'
                            onChange={handleChange}
                            name='relevant_experience'
                        />
                <label htmlFor="choicebox">option</label>
                <select
                            id="choicebox"
                            placeHolder='Mediation Area'
                            onChange={handleChange}
                            name='mediation_Area'
                            size={4}
                        >
                            {optionGenerator()}
                   
                       

                        </select>
                <input
                            type='text'
                            placeHolder='Education'
                            onChange={handleChange}
                            name='education'
                        />


                <Button text='Submit' size='small'/>

             
            
            
            </form>
        </div>
        
     
    )

}

export default AddMediator