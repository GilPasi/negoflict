import "../../styles/components/user_panel.css"
import useAlert from "../../hooks/useAlert"
import { useNavigate } from "react-router-dom"
import WebIM from "../../WebIM"
const UserPanel=({
    handleSwitch , isSwitched , isComplex
})=>{
    const {deletAlert} = useAlert()
    const navigate = useNavigate()

    const handleEnd =async ()=>{
       const isDismissed =await deletAlert({
        title:'Are you sure you want to disconnect?',
        confirmText:'Yes, I`m sure',
        background:'#fffcfcb4',
       })
       if(isDismissed)return
       WebIM.conn.close()
        navigate('/user/survey_page',{
            replace:true
        })
    
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