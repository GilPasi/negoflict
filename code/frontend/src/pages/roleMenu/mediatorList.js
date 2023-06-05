import { useGetMediatorsQuery } from "../../store"
import IconImageUser from '../../components/general/iconImageUser'
import Loader from "../../components/general/Loader"
import Header from "../../components/general/Header"
import '../../styles/components/MediatorList.css'
import PopUpGeneral from "../../components/general/PopUpGeneral"
import { useState } from "react"


const MediatorList = ()=>{

    const {data:mediatoData, error:mediatorError, isFetching} = useGetMediatorsQuery()
    const [show, setShow] = useState(false)
    const [infoChoose, setInfoChoose] = useState({})
    if(isFetching){
        return(
            <Loader withLogo={true}/>
        )
    }
    if(mediatorError)return

    const handleOpen=(info)=>{
        console.log('innn',info)
        setInfoChoose(info)
        setShow(prev=>!prev)
    }
    const handleClose = ()=>{
        setShow(false)

    }
    console.log(mediatoData)



    return(
        <div style={{position:'relative'}}>
        <Header isLarge={true}/>
        <h1 className="headr-MediatorList">Mediator List</h1>
        
        {mediatoData.map(mediator=>{
            return(
                <div className="info-mediator-box" key={mediator.user.id}>
                    <IconImageUser/>
                    <button className="on-open-info-btn" onClick={()=>handleOpen(mediator)}>
                        <div className="full-name-box">
                            <span className="first_name_mediator">{mediator.user.first_name}</span>
                            <span className="last_name_mediator">{mediator.user.last_name}</span>
                        </div>
                    </button>
                </div>    
            )
        })}
            {show&&
                <PopUpGeneral
                 onClose={handleClose}
                  children={infoChoose}
                />
            }

        </div>


    )



}

export default MediatorList