import Header from "../../../components/general/Header"
import ScrollableBox from "../../../components/general/ScrollableBox"
import PlusButton from "../../../components/general/PlusButton"
import { useGetContactsQuery } from "../../../store" 
import { useSelector } from 'react-redux'


const ClientsPage = ()=>{
    const {id} = useSelector(state=>state.user)
    const {data:list, error,isFetching} = useGetContactsQuery({mediator_id:id})

    if(list)
        console.log(list)

    return(
        <article className="centerizer page">
            <Header/>
            <h1>My Clients</h1>
            {list&&<ScrollableBox list={list}/>}
            <PlusButton to='create_user'/>
        </article>
    )
}
export default ClientsPage