import { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import useServer from '../../../hooks/useServer'
import HeaderLarge from '../../../components/general/Header'
import TextHolder from '../../../components/general/TextHolder'


const MyCases = ()=>{

    const {accessToken,id} = useSelector(state=>state.user)
    const {getMyCases} = useServer()
    const [cases,setCases] = useState([])


    useEffect(()=>{
       getMyCases(id,accessToken)
       .then(data=>setCases(data))
       .catch(err=>console.log(err))
    },[])


    return(
        <div>
            <HeaderLarge/>
            <p>My Cases</p>

            {cases.map(caseData=>(
                <div key={caseData.id}>
                    <TextHolder caseData={caseData}/>
                </div>
            ))}



        </div>
    )


}

export default MyCases

