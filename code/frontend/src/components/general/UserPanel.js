import "../../styles/components/user_panel.css"
const UserPanel=({
    handleSwitch , isSwitched
})=>{

    return(
        <section className="user-panel">
            <div className="user-panel--btn">
                <img
                    id="user-panel--save"
                    className="user-panel--img"
                    src="../../../assets/images/save_icon.png" 
                    alt="menu symbol"
                />  
                <h5>Save</h5>
            </div>
            <div onClick={handleSwitch}
                className="user-panel--btn"
            >
                <img
                    className="user-panel--img"
                    src="../../../assets/images/shuttle_icon.png" 
                    alt="menu symbol"
                    id="user-pannel--shuttle-img"
                />
                    <div 
                        className="user-panel-shuttle-circle"
                        style={{transform:`translateX(${isSwitched ? "-75%" : "0"})`}}
                        ></div>
                <h5 id="user-pannel--shuttle-title">Shuttle</h5>
            </div>

            <div className="user-panel--btn">
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