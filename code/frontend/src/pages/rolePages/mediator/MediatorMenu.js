import Header from '../../../components/general/Header'
import Button from '../../../components/general/Button'
import {Link} from 'react-router-dom'
import WebIM from '../../../WebIM' //dont remove this line




const MediatorMenu = ()=>{
    //finished importing Web here for improve preformence later
    //dont remore importing WebIm

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
                <Link to='cases/?open_close=True'>
                    <Button margin='1em' text='Open Cases' length='8em' altitude='2em'/>
                </Link>
                <Link to='cases/?open_close=False'>
                    <Button margin='1em' text='Closed Cases' length='8em' altitude='2em'/>
                </Link>
                <Link to='clients'>
                    <Button margin='1em' text={'active users'} length='8em' altitude='2em'/>
                </Link>
            
            
            </div>
            
            

        </div>

    )
}

export default MediatorMenu