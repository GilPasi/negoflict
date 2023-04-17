import "../../styles/components/toolbar.css"
import Loader from './Loader'
import PopupContainer from './Modal.js'
import AddWindow from "../../components/general/AddWindow"

const ToolBar =({conflictName , id , handleAdd,isMediator,connectionUsers})=>{
    
    return(
        <div className="tb">

            <PopupContainer 
                popContent={<AddWindow/>} 
                imgSrc='../../../assets/images/add_icon_dark.png'
                classStr='tb--btn'
                />

            <div className="tb--title" >
                <h3 className="tb--name">{conflictName}</h3>
                {id?<h4 className="tb--id">I.D. {id}</h4>:<Loader size='small' withLogo={false}/>}
            </div>
                
                
            <div className="tb--btn">
                <img src={`../../../assets/images/search_icon_dark.png`}
                alt="Search button" 
                className="tb--btn-img"
                />
            </div>
            <ul className="connection-box">
                {connectionUsers.map(user=>{
                 
                    const dotColor = user.status==="connect"? 'rgb(31, 241, 31)':'rgba(244, 40, 40, 0.89)'

                    return(
                        <li style={{color:dotColor}} key={user['name']} className="connection-li">
                            <span>{user['name']}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
        
        )
}
export default ToolBar

