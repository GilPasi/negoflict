import '../../styles/components/add_window.css'
import AddUserPage from "../../pages/AddUserPage"
import Button from "../../components/general/Button"
import {useEffect, useState} from 'react'
import { useGetContactsQuery } from '../../store' 
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useAddingManyUsersToOneChatGroupMutation, useRegisterManyUsersToGroupMemberMutation, useGetUsersByCaseQuery,addPerticipents, useSetUserCaseAttributeMutation } from '../../store'
import CreateSelfUser from '../../pages/CreateSelfUserPage'
import Loader from './Loader'

const AddWindow =({groups})=>{
    const [stage,setStage] = useState('pick side')
    const [side,setSide] = useState('')


    const handleChangeSide = ({currentTarget:input})=>{
        const {value} = input
        setSide(()=>value)
    }






        
    return(
        <article>
            {/*{(loadingGetContact || loadingGetUsers) &&*/}
            {/*    // <div style={{position:'fixed',zIndex:'100',width:'100%',height:'100%',opacity:'0.6',backgroundColor:'gray', left:'50%',top:'50%',transform:'translate(-50%,-50%)'}}>*/}
            {/*        <Loader withLogo={true} size={'medium'}/>*/}
            {/*    // </div>*/}
            {/*}*/}
                
               
            
            {stage==='pick side' &&
             <center>
                <h1 className="add-win--title">Choose a party to add a person</h1>
                <hr/>

                <div className='add-win--side'>
                    <input 
                        type='radio'
                        className='add-win--circle' 
                        value='A'
                        name='side select'
                        onChange={handleChangeSide}
                        />
                        
                    <input 
                        type='radio'
                        className='add-win--circle' 
                        value='B'
                        name='side select'
                        onChange={handleChangeSide}
                        />
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

            {stage==='create'&&<CreateSelfUser
            fulfiled={()=>{
                setStage('exist')
                refetchGetUser()
                refetchContact()
            }}
            goBack={()=>setStage('choose')}
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
                        <Button text='Add' length='5em' altitude='2em' margin='0.1em' onClick={handleAdd} disabled={isClicked}/>
                    </footer>


                </center>}

                {stage==='success' &&
                <div>
                    <h1 className='add-win--success-title'>SUCCESS</h1>
                    <div className="add-win--success-animation">
                        <svg className="add-win--animation-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle className="add-win--checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                            <path className="add-win--checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                        </svg>
                    </div>
                </div>
                
                }
              
                
                

        </article>
    )
}
export default AddWindow