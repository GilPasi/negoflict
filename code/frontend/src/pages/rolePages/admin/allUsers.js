import Loader from "../../../components/general/Loader";
import { useGet_all_usersQuery } from "../../../store";
import ScrollableBox from "../../../components/general/ScrollableBox";
import Headers from "../../../components/general/Header";
import { useState } from "react";
import SettingPage from '../../../components/general/SettingsPage'
import Button from "../../../components/general/Button";


const AllUsers = ()=>{
    const {data:allUsersData, error:allUsersError, isLoading:loadingAll} = useGet_all_usersQuery()
    const [info,setInfo] = useState({user:0,isOn:false})


    const handleInfo = (user)=>{
        setInfo({user:user,isOn:true})
    }

    return(
        <div>
            {info.isOn?(<div><SettingPage id={info.user}/><div style={{width:'100%',height:'5px',backgroundColor:'black'}}></div><Button onClick={()=>setInfo({user:0, isOn:false})} margin={'20px'} size={'small'} text={'Back'} /></div>):(
                <div>
                    <Headers isLarge={true}/>
                    {loadingAll?(<Loader/>):(<div>
                                            <h1 style={{transform:'translate(10%)'}}>Manage Accounts</h1>
                {loadingAll?(<Loader/>):allUsersData?(<ScrollableBox infoInsted={true} handleClick={handleInfo}  list={allUsersData} />):<h1>somthing went wrong</h1>}
                   </div> )}

                </div>

            )}
        
        </div>
    )



}
export default AllUsers;