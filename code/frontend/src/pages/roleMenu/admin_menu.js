import Header from '../../components/general/Header'
import Button from '../../components/general/Button'
import {Link} from 'react-router-dom'

const AdminMenu = ()=>{


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
                <Link to='addmediator'>
                    <Button text='Add Mediator' size='small'/>
                </Link>
            
                <Button text='Mediator Accounts' size='small'/>
                <Button text='Closed Cases' size='small'/>
                <Button text='Open Cases' size='small'/>
                <Button text='Mediator Screen' size='small'/>
                <Button text='Massege to Mediator' size='small'/>
                <Button text='Statistics' size='small'/>
            </div>
            
            

        </div>

    )
}

export default AdminMenu