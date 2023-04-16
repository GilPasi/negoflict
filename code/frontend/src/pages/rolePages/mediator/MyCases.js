import { useSelector } from 'react-redux'
import TextHolder from '../../../components/general/TextHolder'
import '../../../styles/pages/case_page.css'
import { useGetMyCasesQuery } from '../../../store'
import Loader from '../../../components/general/Loader'
import '../../../styles/components/scrollable_box.css'



const MyCases = ({isMediator, open_close})=>{
    const {access,id} = useSelector(state=>state.user)
    const {data:cases,error,isLoading,isSuccess} = useGetMyCasesQuery({id:id,access:access,isMediator:isMediator, open_close:open_close})
    
    if(isLoading)return <Loader/>
    if(error)return alert('Eror refresh the page please')
    
    return(
        <div>
            <h1 className='cap--title'> My cases </h1>
            <div className='scrollable-box-big' >
            {isSuccess &&
           
          
            cases.map(caseData=>(
                <div key={caseData.id}>
                    <TextHolder caseData={caseData} withInfo={true}/>
                </div>
            ))
                }
                 </div>



        </div>
    )


}

export default MyCases

