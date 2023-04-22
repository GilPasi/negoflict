import '../../styles/components/add_window.css'
import AddUserPage from "../../pages/AddUserPage"
import Button from "../../components/general/Button"
import {useState} from 'react'

const AddWindow =()=>{
    
    const [stage , setStage] = useState('pick side');
    
    const [selectedPhones , setSelectedPhones] = useState([])
    
    const [selectedParty , setSelectedParty] = useState ('')
    
    const buttonsWidth = '6em'

    const MockUsers=[
        {fullName:'Avi Ron' , email:'aviron@elal.com' , phone:'0541111111'},
        {fullName:'Eli Copter' , email:'Helicopter@elal.com' , phone:'054222222'},
        {fullName:'Tiki Poor' , email:'TIkIpoor@bags.com' , phone:'05433333333'},
        ]

    function handleMark(phone) {
        console.log(selectedPhones)
        if (selectedPhones.includes(phone)) {
          setSelectedPhones(selectedPhones.filter(p => p !== phone));
        } else {
          setSelectedPhones([...selectedPhones, phone]);
        }
      }

    const users = MockUsers.map((user,index)=>(
        <label className="add-win--u-container">
            <div className="add-win--option" >
                <span> {user.fullName}</span>
                <span> {user.phone}</span>
                <span> {user.email}</span>
            </div>
            {/* Phone is a unique ID for each user*/}
            <input
                checked={selectedPhones.includes(user.phone)?'checked':''}
                type="checkbox"
                onClick={()=>handleMark(user.phone)} 
                name={index}
            />
            <div className="add-win--checkmark"/>
        </label>
    ))

    const handleAdd = ()=>{
        alert(selectedPhones)
        if(selectedPhones.length===0){
            document.querySelector('#add-win-w').style.visibility='visible';
            return
        }
        selectedPhones.forEach(phone=>console.log('phone: ' + phone))
        /*Add to the chat - backend logic
            ...
            ...
            ...
        */
        setStage('success')
    }   

        
    return(
        <article>
            {stage==='pick side' &&
             <center>
                <h1 className="add-win--title">Choose a party to add a person</h1>
                <hr/>

                <div className='add-win--side'>
                    <input 
                        type='radio'
                        className='add-win--circle' 
                        value='A'
                        name='side select'/>
                    <input 
                        type='radio'
                        className='add-win--circle' 
                        value='B'
                        name='side select'/>
                </div>
                <Button text="Next" margin='4em 0 0 0' size='small' onClick={()=>setStage('choose')}/>



            </center>
            }


            {stage==='choose' &&
             <center>
                <h1 className="add-win--title">Add a new participant</h1>
                    <Button text="Exisiting user" length={buttonsWidth} onClick={()=>setStage('exist')}/>
                    <Button text="Create user" length={buttonsWidth} onClick={()=>setStage('create') }/>
            </center>
            }


            {stage==='create'&&<AddUserPage
                window='large'
                goBack={()=>setStage('choose')}
                next={()=>setStage('success')}
            />}

            {stage==='exist'&&
                <center>
                    <h1 className='add-win--title'>Choose participants</h1>
                    <hr />
                    <div className="add-win--users-list">
                        {users}
           

                    </div>
                    <p className='warning' id='add-win-w'>You must select at least one user</p>
                    <footer>
                        <Button text='Back' length='5em' altitude='2em' margin='0.1em' onClick={()=>setStage('choose')}/>
                        <Button text='Add' length='5em' altitude='2em' margin='0.1em' onClick={handleAdd}/>
                    </footer>


                </center>}

                {stage==='success' &&
                <div>
                    <h1 className='add-win--success-title'>SUCCESS</h1>
                    <div class="add-win--success-animation">
                        <svg class="add-win--animation-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle class="add-win--checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                            <path class="add-win--checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                        </svg>
                    </div>
                </div>
                
                }

        </article>
    )
}
export default AddWindow