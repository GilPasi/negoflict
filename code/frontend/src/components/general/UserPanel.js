import "../../styles/components/user_panel.css"
import useAlert from "../../hooks/useAlert"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { getPermName } from "../../utils/permissions"
import {useLocation} from "react-router-dom";
import useChat from "../../hooks/useChat";
import Loader from "./Loader"
import { useState } from "react"

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
    const [loadinExit,setLoadingExit] = useState(false)
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
       setLoadingExit(()=>true)
       if(roleName==='mediator'){
           await muteAllMembers({groupId:centeredGroupId, shuttle:false})
           await setAnnouncement({groupId:centeredGroupId,isChatEnds:true})
       }
       await publishPresence({description:'offline'})
        disconnect()
        setLoadingExit(()=>false)

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

    
    return (
        <div>
          {loadinExit ? (<div style={{display:'flex',justifyContent:'space-around'}}>
            <Loader size='x-small' withLogo={false}/><h3 style={{color:'var(--green-dark)'}}>Exiting Chat</h3></div>
          ) : (
            <section className="user-panel">
              {isComplex && (
                <div className="user-panel--btn">
                  <img
                    id="user-panel--save"
                    className="user-panel--img"
                    src="../../../assets/images/save_icon.png"
                    alt="menu symbol"
                  />
                  <h5>Save</h5>
                </div>
              )}
              {isComplex && (
                <div onClick={handleSwitch} className="user-panel--btn user-panel--shuttle">
                  <div
                    id="user-panel--shuttle-icon"
                    style={{ backgroundColor: isSwitched ? "var(--green-dark)" : "" }}
                  >
                    <div
                      className="user-panel-shuttle-circle"
                      style={{ transform: `translateX(${isSwitched ? "-100%" : "55%"})` }}
                    />
                  </div>
                  <h5 id="user-pannel--shuttle-title">Shuttle</h5>
                </div>
              )}
              <div className="user-panel--btn" id="user-panel--end" onClick={handleEnd}>
                <img
                  className="user-panel--img"
                  src="../../../assets/images/end_icon.png"
                  alt="menu symbol"
                />
                <h5>End</h5>
              </div>
            </section>
          )}
        </div>
      );
              }
      
export default UserPanel