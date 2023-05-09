import { useSelector } from "react-redux";
import '../../styles/components/users_list.css'


const UsersList = ()=>{
    const users = useSelector(state=>state.perticipent)


    return(
        <div className="users-list" >
            {users.map(user=>{
                const onlineColor = user.connect === true? 'var(--green-dark-shaded)' :'black'
                return(
                <div key={user.agoraUsername} className="row">
                    <div className="users-list--side" 
                    style={{color:onlineColor,
                            borderColor:onlineColor,
                             backgroundColor:user.connect === true?"var(--green-dark)" :""}}>
                        {user.side}
                    </div>
                    {/* {user.connect?(<span className="checkmark">
                        <div className="checkmark_stem"/>
                        <div className="checkmark_kick"/>
                    </span>

                    ):(
                        <div className="attribute" style={{backgroundColor:onlineColor}}/>
                    )} */}
                    <div style={{color:onlineColor}}>{user.fullName}</div>


                </div>)})}
        </div>
    )
}
export default UsersList