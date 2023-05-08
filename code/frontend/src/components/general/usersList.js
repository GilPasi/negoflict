import { useSelector } from "react-redux";
import '../../styles/components/UserList.css'


const UsersList = ()=>{
    const users = useSelector(state=>state.perticipent)




    return(
        <div className="listBox" >
            {users.map(user=>{
                const onlineColor = user.connect === true? '#0b590b' :'#d13d3d'
                return(
                <div key={user.agoraUsername} className="row">
                     <div className="side">
                        {user.side}
                    </div>
                    {user.connect?(
                    <span className="checkmark">
                        <div className="checkmark_stem"></div>
                        <div className="checkmark_kick"></div>
                    </span>)
                    :
                    (
                        <div>
                        <div className="attribute" style={{backgroundColor:onlineColor}}></div>
                    </div>
                    )}
                   
                   
                    <div>
                        {user.fullName}
                    </div>


                </div>
            )})}
        </div>
    )





}
export default UsersList