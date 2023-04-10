import { useSelector } from 'react-redux'
import TextHolder from '../../../components/general/TextHolder'
import '../../../styles/pages/case_page.css'
import { useGet_my_casesQuery } from '../../../store'
import Loader from '../../../components/general/Loader'



const MyCases = ({isMediator})=>{
    const {access,id} = useSelector(state=>state.user)
    const {data:cases,error,isLoading,isSuccess} = useGet_my_casesQuery({id:id,access:access,isMediator:isMediator})
    
    if(isLoading)return <Loader/>
    if(error)return alert('Eror refresh the page please')
    
    return(
        <div>
            <h1 className='cap--title'> My cases </h1>
            {isSuccess &&
          
            cases.map(caseData=>(
                <div key={caseData.id}>
                    <TextHolder caseData={caseData}/>
                </div>
            ))
                }



        </div>
    )


}

export default MyCases

