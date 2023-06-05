import { useSelector } from 'react-redux'
import CaseReview from '../../../components/general/CaseReview'
import TextHolder from '../../../components/general/TextHolder'

import Header from "../../../components/general/Header"
import Loader from '../../../components/general/Loader'
import { useGetMyCasesQuery } from '../../../store'



const MyCases = ({isMediator, open_close})=>{
    const {access,id} = useSelector(state=>state.user)
    const {data:cases,error,isLoading,isSuccess} = useGetMyCasesQuery({id:id,access:access,isMediator:isMediator, open_close:open_close})
    console.log('casesss==>>>',cases)
    if(isLoading)return <Loader/>
    if(error)return alert('Eror refresh the page please')
    return(
        <article style={{ minWidth: "var(--screen-minw)",minHeight: "var(--screen-minh)",}}>
            <Header isLarge={true}/>

            <h1 className='title-large'> My cases </h1>
            <div style={{height: '55vh',overflowY: 'scroll',}} >
                {isSuccess &&
                    cases.map((caseData , index)=>(
                        <div key={caseData?.id}>
                        <CaseReview 
                            caseName={caseData?.title}
                            creationDate="April 2023"
                            caseCategory={caseData?.category}
                            caseData={caseData}
                        /> 
                        </div>
                ))}
            </div>
        </article>
)}

export default MyCases

