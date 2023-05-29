import "../../styles/components/user_panel.css"
import useAlert from "../../hooks/useAlert"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { getPermName } from "../../utils/permissions"
import {useLocation} from "react-router-dom";
import useChat from "../../hooks/useChat";

const UserPanel=({
    handleSwitch , isSwitched
})=>{
    //hooks=====================================
    const { disconnect, setAnnouncement, publishPresence, muteAllMembers } = useChat()
    const location = useLocation()
    const navigate = useNavigate()
    const {deletAlert} = useAlert()
    //===========================================

    //state=======================================
    const {role} = useSelector(state=>state.user)
    //=============================================

    //variable=====================================
    const roleName = getPermName({role:role})
    const isComplex = roleName === 'mediator'
    const {caseId} = location.state ?? ''
    const {groups} = location.state ?? []
    const centeredGroupId = groups.find(group=>group.groupname.endsWith('G'))?.groupid
    //==============================================

    const handleEnd =async ()=>{
       const isDismissed =await deletAlert({
        title:'Are you sure you want to disconnect?',
        confirmText:'Yes, I`m sure',
        background:'#fffcfcb4',
       })
       if(isDismissed)return
       if(roleName==='mediator'){
           await muteAllMembers({groupId:centeredGroupId, shuttle:false})
           await setAnnouncement({groupId:centeredGroupId,isChatEnds:true})
       }
       await publishPresence({description:'offline'})
       await disconnect()

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