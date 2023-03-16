import Header from '../../../components/general/Header'
import Button from '../../../components/general/Button'
import {Link} from 'react-router-dom'

const MediatorMenu = ()=>{


    return(
        <div className='am'>
            <Header className='' isLarge={true}/>
            <div className='text_header'>
            <div>
                <h1>Hello</h1>
            </div>
            <div>
                <h3>System Manager</h3>
            </div>
            </div>
            <div className='am--menu'>
                <Link to='cases'>
                    <Button text='My Cases' size='small'/>
                </Link>
            
            
            </div>
            
            

        </div>

    )
}

export default MediatorMenu