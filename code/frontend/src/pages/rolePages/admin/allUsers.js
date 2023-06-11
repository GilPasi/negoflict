import Loader from "../../../components/general/Loader";
import { useGet_all_usersQuery } from "../../../store";
import ScrollableBox from "../../../components/general/ScrollableBox";
import Headers from "../../../components/general/Header";
import { useState } from "react";
import SettingPage from '../../../components/general/SettingsPage'

const AllUsers = ()=>{
    const {data:allUsersData, error:allUsersError, isLoading:loadingAll} = useGet_all_usersQuery()
    const [info,setInfo] = useState({user:0,isOn:false})


    const handleInfo = (user)=>{
        setInfo({user:user,isOn:true})
    }

    return(
        <div>
            {info.isOn?(<div><SettingPage id={info.user}/></div>):(
                <div>
                    <Headers isLarge={true}/>
                    <h1 style={{transform:'translate(10%)'}}>Manage Accounts</h1>
                {loadingAll?(<Loader/>):allUsersData?(<ScrollableBox infoInsted={true} handleClick={handleInfo}  list={allUsersData} />):<h1>somthing went wrong</h1>}
                </div>

            )}
        
        </div>
    )



}
export default AllUsers;