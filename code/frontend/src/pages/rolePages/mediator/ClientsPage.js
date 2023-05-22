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
    const {data:allUsersData, error:allUsersError} = useGet_all_usersQuery()
    const {data:list, error,isFetching} = useGetContactsQuery({mediator_id:id})

    if(list){
        console.log('list',list)
    }
    if(allUsersData){
        console.log('all users',allUsersData)
    }


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
            filteredUsers = userView.filter(user=>user.first_name.includes(searchRes) || user.last_name.includes(searchRes))
        
        else
        filteredUsers = userView.filter(user=>user.user.first_name.includes(searchRes) || user.user.last_name.includes(searchRes))
        
        console.log(filteredUsers); 
        console.log(filteredUsers.length);
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
                    <ScrollableBox list={userView} hasExit={true}/>
                    :
                    <Loader withLogo={true} size='medium'/>
                }

            <PlusButton to='create_user'/>
        </article>
    )
}
export default ClientsPage

