import Header from '../../components/generals/Header'
import Button from '../../components/generals/Button'
import {Link} from 'react-router-dom'

const AdminMenu = ()=>{


    return(
        <div className='am'>
            <Header className='' isLarge={true}/>
            <div className='text_header'>
            <p>
                <h1>Hello</h1>
            </p>
            <p>
                <h3>System Manager</h3>
            </p>
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