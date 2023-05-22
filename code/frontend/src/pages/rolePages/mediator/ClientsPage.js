import Header from "../../../components/general/Header"
import ScrollableBox from "../../../components/general/ScrollableBox"
import PlusButton from "../../../components/general/PlusButton"
import SearchBar from "../../../components/general/SearchBar"
import { useGetContactsQuery, useGet_all_usersQuery } from "../../../store" 
import { useSelector } from 'react-redux'
import {useState , useEffect} from 'react'
import Loader from "../../../components/general/Loader"



const ClientsPage = ()=>{
    const {id} = useSelector(state=>state.user)
    const {data:allUsersData, error:allUsersError, isLoading:loadingAll} = useGet_all_usersQuery()
    const {data:list, error,isFetching, isLoading} = useGetContactsQuery({mediator_id:id})
    const [isAllClients , setIsAllClients] = useState( false);
    const [searchRes , setSearchRes] = useState("");
    const [userView,setUserView] = useState([])


    useEffect(()=>{
        if(!isAllClients){
            if(!list){
                setUserView(()=>[])
                if(error){
                    console.log(error)
                }
                return
            }
            else
                setUserView(()=>list)
        }
        else{
            if(!allUsersData){
                setUserView(()=>[])
                if(allUsersError){
                    console.log(allUsersError)
                }
                return
            }
            else
                setUserView(()=>allUsersData)
        }

    },[allUsersData,list,isAllClients])

    const handleSearchTerm = ({currentTarget:input})=>{
        const {value} = input
        if(value===''){
            setUserView(()=>isAllClients?allUsersData:list)
            return
        }
        setSearchRes(prev=>value)
    }



   

    const titleStyle = {
        margin:"0",
        display:"inline",
    }

    const handleSearch =()=>{
        let filteredUsers = []
        if(!(userView.length >0))return

        if(isAllClients)
            filteredUsers = userView.filter(user=>user.first_name.includes(searchRes) || user.last_name.includes(searchRes) || user.email.includes(searchRes))
        
        else
        filteredUsers = userView.filter(user=>user.user.first_name.includes(searchRes) || user.user.last_name.includes(searchRes || user.user.email.includes(searchRes)))
        
        setUserView(()=>filteredUsers)
    }


    return(
        <article className="middle page">
            <Header />
            <SearchBar search={searchRes} 
            handleClick={handleSearch} 
            handleChange={handleSearchTerm} />
                <div 
                    role="button"
                    className="switch-arrow"
                    onClick={()=>setIsAllClients(prevState=>!prevState)}
                />
                <h1 style={titleStyle}>{isAllClients ?'All Clients' : 'My Clients'}</h1>
                {userView.length > 0 ?
                    <ScrollableBox pressDetail={{title:'Are you sure you want to delete this contact', confirm:'confirm'}} list={userView} hasExit={!isAllClients}/>
                    :
                    isLoading&&!isAllClients? <Loader withLogo={true} size='medium'/>: loadingAll&&isAllClients? <Loader withLogo={true} size='medium'/>:<h1>no users</h1>
                    
                   
                }

            <PlusButton to='create_user'/>
        </article>
    )
}
export default ClientsPage

