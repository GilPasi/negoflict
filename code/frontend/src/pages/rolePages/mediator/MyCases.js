import { useSelector } from 'react-redux'
import CaseReview from '../../../components/general/CaseReview'
import TextHolder from '../../../components/general/TextHolder'

import Header from "../../../components/general/Header"
import Loader from '../../../components/general/Loader'
import { useGetMyCasesQuery } from '../../../store'



const MyCases = ({isMediator, open_close})=>{
    const {access,id} = useSelector(state=>state.user)
    const {data:cases,error,isLoading,isSuccess} = useGetMyCasesQuery({id:id,access:access,isMediator:isMediator, open_close:open_close})
    
    if(isLoading)return <Loader/>
    if(error)return alert('Eror refresh the page please')
    return(
        <article style={{ minWidth: "var(--screen-minw)",minHeight: "var(--screen-minh)",}}>
            <Header isLarge={true}/>

            <h1 className='title-large'> My cases </h1>
            <div style={{height: '50vh',overflowY: 'scroll',}} >
                {isSuccess &&
                    cases.map(caseData=>(
                        <div key={caseData.id}>
                        <CaseReview 
                            caseName="Orgainzation - work spy"
                            caseId="2e55e4"
                            creationDate="April 2023"
                            caseIndex="1"
                            caseData={caseData}
                        />
                            
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

