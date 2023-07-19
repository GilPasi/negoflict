import "../../styles/components/user_panel.css"
import useAlert from "../../hooks/useAlert"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { getPermName } from "../../utils/permissions"
import {useLocation} from "react-router-dom";
import useChat from "../../hooks/useChat";
import Loader from "./Loader"
import { useState } from "react"
import useFileSaver from "../../hooks/useFileSaver"


const UserPanel=({
    handleSwitch , isSwitched
})=>{
    //hooks=====================================
    const { disconnect, setAnnouncement, publishPresence, muteAllMembers } = useChat()
    const location = useLocation()
    const navigate = useNavigate()
    const {deletAlert} = useAlert()
    const {exportToCSV} = useFileSaver()
    //===========================================

    //state=======================================
    const {role, username, first_name} = useSelector(state=>state.user)
    const [loadinExit,setLoadingExit] = useState(false)
    const {activeGroup} = useSelector(state=>state.position)
    const messages = useSelector(state=>state.chat[activeGroup])
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
       await publishPresence({description:`offline=${roleName==='mediator'?username:first_name}`})
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
    // const data =[ { name: "John", age: 20, occupation: "Engineer" },
    // { name: "Jane", age: 30, occupation: "Doctor" }]


    const saveMessages = ()=>{
      if(!messages || !messages?.messages)return
      const data = []
      messages.messages.forEach(msg=>{
        const modifyObjectMessages = flattenObject(msg)
        data.push(modifyObjectMessages)
      })
      exportToCSV(data, `case_${caseId}_group_${activeGroup}`)
    }
    
    const flattenObject=(obj, prefix = '')=> {
      return Object.keys(obj).reduce((acc, k) => {
        const pre = prefix.length ? prefix + '_' : '';
        if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
          Object.assign(acc, flattenObject(obj[k], pre + k));
        } else {
          // Check if key is 'time' and convert its value
          if (k === 'time' && typeof obj[k] === 'number' && !Number.isNaN(Date.parse(new Date(obj[k])))) {
            acc[pre + k] = timestampToDate(obj[k]);
          } else {
            acc[pre + k] = obj[k];
          }
        }
        return acc;
      }, {});
    }

    const timestampToDate=(timestamp)=> {
      const date = new Date(timestamp);
      const day = ("0" + date.getDate()).slice(-2);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);
      
      return month + '/' + day + '/' + year + ' ' + hours + ':' + minutes;
  }
  

    
    return (
        <div>
          {loadinExit ? (<div style={{display:'flex',justifyContent:'space-around'}}>
            <Loader size='x-small' withLogo={false}/><h3 style={{color:'var(--green-dark)'}}>Exiting Chat</h3></div>
          ) : (
            <section className="user-panel">
              {isComplex && (
                
                <div className="user-panel--btn">
                  <button style={{border:'none',background:'none'}} onClick={saveMessages}>
                  <img
                    id="user-panel--save"
                    className="user-panel--img"
                    src="../../../assets/images/save_icon.png"
                    alt="menu symbol"
                  />
                  <h5>Save</h5>
                  </button>
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
                  <h5 id="user-pannel--shuttle-titlea">Shuttle</h5>
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