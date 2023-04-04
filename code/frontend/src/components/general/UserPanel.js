import "../../styles/components/user_panel.css"
const UserPanel=({
    handleSwitch , isSwitched , isComplex
})=>{

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
                            style={{transform:`translateX(${isSwitched ? "-75%" : "55%"})`}}
                        />
                    </div>
                    {/* <img
                        className="user-panel--img"
                        src="../../../assets/images/shuttle_icon.png" 
                        alt="menu symbol"
                        id="user-pannel--shuttle-img"
                    /> */}
                    <h5 id="user-pannel--shuttle-title">Shuttle</h5>
                </div>
            
            }

            <div 
                className="user-panel--btn"
                id="user-panel--end"
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