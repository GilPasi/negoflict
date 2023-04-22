import { useSelector } from 'react-redux'
import TextHolder from '../../../components/general/TextHolder'
import { useGetMyCasesQuery } from '../../../store'
import Loader from '../../../components/general/Loader'



const MyCases = ({isMediator, open_close})=>{
    const {access,id} = useSelector(state=>state.user)
    const {data:cases,error,isLoading,isSuccess} = useGetMyCasesQuery({id:id,access:access,isMediator:isMediator, open_close:open_close})
    
    if(isLoading)return <Loader/>
    if(error)return alert('Eror refresh the page please')
    return(
        <article>
            <h1 className='title'> My cases </h1>
            <div style={{height: '45vh',overflowY: 'scroll',}} >
                
            {isSuccess &&
                cases.map(caseData=>(
                    <div key={caseData.id}>
                        <TextHolder 
                        caseData={caseData} 
                        withInfo={true}
                        />
                    </div>
            ))}
            </div>
        </article>
)}

export default MyCases

