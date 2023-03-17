import { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import useServer from '../../../hooks/useServer'
import TextHolder from '../../../components/general/TextHolder'
import '../../../styles/case_page.css'



const MyCases = ()=>{

    const {accessToken,id} = useSelector(state=>state.user)
    const {getMyCases} = useServer()
    const [cases,setCases] = useState([
        {
            title: "conf1" ,
            time:"dsa",
            id :"123",
        },
        {
            title: "conf1" ,
            time:"dsa",
            id :"123",
        }
    ])


    // useEffect(()=>{
    //    getMyCases(id,accessToken)
    //    .then(data=>setCases(data))
    //    .catch(err=>console.log(err))
    // },[])

    
    


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

