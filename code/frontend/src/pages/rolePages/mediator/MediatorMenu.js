import Header from '../../../components/general/Header'
import Button from '../../../components/general/Button'
import {Link} from 'react-router-dom'
// import WebIM from '../../../WebIM' //dont remove this line
import '../../../styles/components/mediator_menu.css'
import { useSelector } from 'react-redux'



const MediatorMenu = ()=>{
    //finished importing Web here for improve preformence later
    //dont remore importing WebIm
    const {first_name, last_name} = useSelector(state=>state.user)
    const FONT_SIZE = '1.75em' , LENGTH  = '8em' , MARGIN = '1em' , ALTITUDE = '2em'



    return(
            <article className='page' >
                <Header isLarge={true}/>
                <div className='mm--menu middle'>
                    <h1>Hello</h1>
                    <h3>{`${first_name} ${last_name}`}</h3>
                    <h3>Mediator menu</h3>

                    <Link to='cases/?open_close=True'>
                        <Button 
                            margin={MARGIN} 
                            text='Open Cases' 
                            length={LENGTH} 
                            altitude={ALTITUDE} 
                            fontSize={FONT_SIZE}
                        />
                    </Link>
                    <Link to='cases/?open_close=False'>
                        <Button 
                            margin={MARGIN} 
                            text='Closed Cases'
                            length={LENGTH}
                            altitude={ALTITUDE}
                            fontSize={FONT_SIZE}
                            />
                    </Link>
                    <Link to='clients'>
                        <Button 
                            margin={MARGIN} 
                            text='Active Users'
                            length={LENGTH}
                            altitude={ALTITUDE}
                             fontSize={FONT_SIZE}
                        />
                    </Link>
            </div >
        </article>
    )
}

export default MediatorMenu