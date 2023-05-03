import '../../styles/pages/admin_menu.css'
import Header from '../../components/general/Header'
import Button from '../../components/general/Button'
import {Link} from 'react-router-dom'

const AdminMenu = ()=>{


    return(
        <div className='am page centerizer'>
            <Header className='' isLarge={true}/>
            <div className='text_header'>
            <div>
                <h1>Hello</h1>
            </div>
            <div>
                <h3>System Manager</h3>
            </div>
            </div>
                <Link to='addmediator' style={{borderRadius:'2em' , margin:'10px'}}>
                    <Button text='Add Mediator' size='medium' margin='0'/>
                </Link>
                <Link to='' style={{borderRadius:'2em' , margin:'10px'}}>
                    <Button text='Mediator Accounts' size='medium' margin='0'/>
                </Link>
                <Link to='' style={{borderRadius:'2em' , margin:'10px'}}>
                    <Button text='Closed Cases' size='medium' margin='0'/>
                </Link>
                <Link to='' style={{borderRadius:'2em' , margin:'10px'}}>
                    <Button text='Open Cases' size='medium' margin='0'/>
                </Link>
                <Link to='' style={{borderRadius:'2em' , margin:'10px'}}>
                    <Button text='Mediator Screen' size='medium' margin='0'/>
                </Link>
                <Link to='' style={{borderRadius:'2em' , margin:'10px'}}>
                    <Button text='Massege to Mediator' size='medium' margin='0'/>
                </Link>
                <Link to='' style={{borderRadius:'2em' , margin:'10px'}}>
                    <Button text='Statistics' size='medium' margin='0'/>
                </Link>
        

        </div>

    )
}

export default AdminMenu