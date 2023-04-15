import Header from "../../../components/general/Header"
import ScrollableBox from "../../../components/general/ScrollableBox"
import '../../../styles/pages/clients.css'
import '../../../styles/pages/case_page.css'
import { useGet_clientsQuery } from "../../../store" 
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"


const Clients = ()=>{
    const {id} = useSelector(state=>state.user)

    const {data:list, error,isFetching} = useGet_clientsQuery({mediator_id:id})

    if(list)
        console.log(list)

    

    return(
        <div className="clients">
            <div className="header">
            <Header/>
            <h1 className="cap--title"><span>My Clients</span></h1>
            </div>
            
          
            <div className="client-div">
                {list&&
                <ScrollableBox list={list}/>
                }
            </div>
            <Link to='create_user' >
            <div className="add-client-div">
            <div className="cap--plus-wrapper">
                    <div className="cap--plus">
                    <div className="cap--line" id="cap--line-ver"></div>
                    <div className="cap--line" id="cap--line-hor"></div>
                    </div>
                    </div>
            </div>
            </Link>

            </div>
          
    )

}


export default Clients