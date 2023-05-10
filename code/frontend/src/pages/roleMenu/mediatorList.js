import { useGetMediatorsQuery } from "../../store"
import IconImageUser from '../../components/general/iconImageUser'
import Loader from "../../components/general/Loader"
import Header from "../../components/general/Header"
import '../../styles/components/MediatorList.css'


const MediatorList = ()=>{

    const {data:mediatoData, error:mediatorError, isFetching} = useGetMediatorsQuery()
    
    if(isFetching){
        return(
            <Loader withLogo={true}/>
        )
    }
    if(mediatorError)return


    return(
        <div>
        <Header isLarge={true}/>
        <h1 className="headr-MediatorList">Mediator List</h1>
        
        {mediatoData.map(mediator=>{
            return(
                <div className="info-mediator-box" key={mediator.user.id}>
                    <IconImageUser/>
                    <div className="full-name-box">
                        <span className="first_name_mediator">{mediator.user.first_name}</span>
                        <span className="last_name_mediator">{mediator.user.last_name}</span>
                    </div>
                </div>
            )
        })}

        </div>


    )



}

export default MediatorList