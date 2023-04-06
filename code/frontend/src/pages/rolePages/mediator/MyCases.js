import { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import useServer from '../../../hooks/useServer'
import TextHolder from '../../../components/general/TextHolder'
import '../../../styles/pages/case_page.css'



const MyCases = ({isMediator})=>{

    const {access,id} = useSelector(state=>state.user)
    const {getMyCases} = useServer()
    const [cases,setCases] = useState([])


    useEffect(()=>{
       getMyCases(id,access,isMediator)
       .then(data=>setCases(data))
       .catch(err=>console.log(err))
    },[])

    
    


    return(
        <div>
         
            <h1 className='cap--title'> My cases </h1>
            {cases.map(caseData=>(
                <div key={caseData.id}>
                    <TextHolder caseData={caseData}/>
                </div>
            ))}



        </div>
    )


}

export default MyCases

