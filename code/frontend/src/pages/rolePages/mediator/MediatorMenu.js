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
                    <Button text='My Cases' size='small'/>
                </Link>
                <Link to='cases/?open_close=False'>
                    <Button text='Close Cases' size='small'/>
                </Link>
                <Link to='clients'>
                    <Button text={'Clients'} size='small'/>
                </Link>
            
            
            </div>
            
            

        </div>

    )
}

export default MediatorMenu