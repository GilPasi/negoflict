import Header from "../../../components/general/Header"
import ScrollableBox from "../../../components/general/ScrollableBox"
import PlusButton from "../../../components/general/PlusButton"
import { useGetContactsQuery } from "../../../store" 
import { useSelector } from 'react-redux'
import {useState , useEffect} from 'react'



const ClientsPage = ()=>{
    const {id} = useSelector(state=>state.user)
    const {data:list, error,isFetching} = useGetContactsQuery({mediator_id:id})

    if(list)
        console.log(list)

    const [isAllClients , setIsAllClients] = useState( false);

    useEffect(()=>{
        //Hen: implement fetching


    },[isAllClients])

    const titleStyle = {
        margin:"0",
        display:"inline",
    }

    return(
        <article className="middle page">
            <Header/>
                <div 
                    role="button"
                    className="switch-arrow"
                    onClick={()=>setIsAllClients(prevState=>!prevState)}
                />
                <h1 style={titleStyle}>{isAllClients ?'All Clients' : 'My Clients'}</h1>

            {list&&<ScrollableBox list={list} hasExit={true}/>}
            <PlusButton to='create_user'/>
        </article>
    )
}
export default ClientsPage

