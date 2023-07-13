import { useSelector } from 'react-redux'
import CaseReview from '../../../components/general/CaseReview'
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
            <div style={{height: '55vh',overflowY: 'scroll',}} >
                {isSuccess &&
                    cases.map((caseData , index)=>{
                        const isoString = caseData?.create_at
                        let date = new Date(isoString);
                        let options = { year: 'numeric', month: 'long', day: 'numeric' };
                        let formattedDate = date.toLocaleDateString("en-US", options);

                        return(
                        <div key={caseData?.id}>
                        <CaseReview 
                            openClose={open_close==='True'}
                            caseName={caseData?.title}
                            creationDate={formattedDate}
                            caseCategory={caseData?.category}
                            caseData={caseData}
                        /> 
                        </div>
                    )})}
            </div>
        </article>
)}

export default MyCases

