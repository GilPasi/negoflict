import "../../styles/components/user_panel.css"
import useAlert from "../../hooks/useAlert"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { getPermName } from "../../utils/permissions"
import WebIM from "../../WebIM"
const UserPanel=({
    handleSwitch , isSwitched , isComplex, caseId,centerGroup
})=>{
    const {role} = useSelector(state=>state.user)
    const roleName = getPermName({role:role})
    const {first_name, last_name} = useSelector(state=>state.user)
    

    const {deletAlert} = useAlert()
    const navigate = useNavigate()

    const handleEnd =async ()=>{
       const isDismissed =await deletAlert({
        title:'Are you sure you want to disconnect?',
        confirmText:'Yes, I`m sure',
        background:'#fffcfcb4',
       })
       if(isDismissed)return
       if(roleName==='mediator')
            WebIM.conn.enableSendGroupMsg({groupId:centerGroup.groupid})

       WebIM.conn.close()
       const roleName = getPermName({role:role})

       if(roleName==='user')
            navigate('/user/survey_page',{
                replace:true,
                state:{
                    caseId:caseId
                }
            })
        else{
            navigate(`/${roleName}`,{
                replace:true
            })
        }
        
    }
   
    
    return(
        <section className="user-panel">
            {isComplex&&
                <div className="user-panel--btn">
                    <img
                        id="user-panel--save"
                        className="user-panel--img"
                        src="../../../assets/images/save_icon.png" 
                        alt="menu symbol"
                    />  
                    <h5>Save</h5>
                </div>
            }
            {isComplex&&
                <div
                    onClick={handleSwitch}
                    className="user-panel--btn user-panel--shuttle"
                >

                    <div id="user-panel--shuttle-icon"
                        style={{backgroundColor:isSwitched?"var(--green-dark)":""}}
                    >
                        <div 
                            className="user-panel-shuttle-circle"
                            style={{transform:`translateX(${isSwitched ? "-100%" : "55%"})`}}
                        />
                    </div>
                    <h5 id="user-pannel--shuttle-title">Shuttle</h5>
                </div>
            
            }
            <div 
                className="user-panel--btn"
                id="user-panel--end"
                onClick={handleEnd}
                >
                   
                    <img
                        className="user-panel--img"
                        src="../../../assets/images/end_icon.png" 
                        alt="menu symbol"/>
                    <h5>End</h5>
            </div>
        </section>
    )
}
export default UserPanel