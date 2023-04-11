import "../../styles/components/toolbar.css"
import PopupContainer from './Modal.js'
import AddWindow from "../../components/general/AddWindow"

const ToolBar =({conflictName , id , handleAdd})=>{
    
    return(
        <div className="tb">
            <PopupContainer popContent={<AddWindow/>}/>
                <div className="tb--title" >
                    <h3 className="tb--name">{conflictName}</h3>
                    <h4 className="tb--id">I.D. {id}</h4>
                </div>
                
                
                <div className="tb--btn">
                    <img src={`../../../assets/images/search_icon_dark.png`}
                    alt="Search button" 
                    className="tb--btn-img"
                    />
                </div>
        </div>
        
        )
}
export default ToolBar

