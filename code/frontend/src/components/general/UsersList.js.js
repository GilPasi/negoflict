import { useSelector } from "react-redux";
import '../../styles/components/users_list.css'


const UsersList = ()=>{
    const users = useSelector(state=>state.perticipent)
    const fontColor = "#000000d4"

    const handleObserve = ()=>{
        const modal = document.querySelector(".cp--user-info")
        modal.show()
    }

    return(
        <div className="users-list" >
            {users.map(user=>{
                return(
                <div key={user.agoraUsername} className="users-list--member"
                  onClick={handleObserve}
                  >
                    <div className="users-list--side" 
                       
                    style={{color:fontColor,
                            borderColor:fontColor,
                            backgroundColor:user.connect === true?"var(--green-dark)" :"transparent"}}>
                        {user.side}
                    </div>
                    <div style={{color:fontColor}}>{user.fullName}</div>
                </div>
            )})}
        </div>
    )
}
export default UsersList