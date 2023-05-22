import { useSelector } from 'react-redux'
import TextHolder from '../../../components/general/TextHolder'
import SearchBar from '../../../components/general/SearchBar'

import { useGetMyCasesQuery } from '../../../store'
import Loader from '../../../components/general/Loader'



const MyCases = ({isMediator, open_close})=>{
    const {access,id} = useSelector(state=>state.user)
    const {data:cases,error,isLoading,isSuccess} = useGetMyCasesQuery({id:id,access:access,isMediator:isMediator, open_close:open_close})
    
    if(isLoading)return <Loader/>
    if(error)return alert('Eror refresh the page please')
    return(
        <article className="page">
            <h1 className='title-large'> My cases </h1>
            <div style={{height: '45vh',overflowY: 'scroll',}} >
                {isSuccess &&
                    cases.map(caseData=>(
                        <div key={caseData.id}>
                            
                            <TextHolder 
                                addOns={caseData.category}
                                caseData={caseData} 
                                withInfo={true}
                                hasExit={false}
                            />
                        </div>
                ))}
            </div>
        </article>
)}

export default MyCases

