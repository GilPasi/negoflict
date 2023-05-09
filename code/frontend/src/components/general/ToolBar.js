import "../../styles/components/toolbar.css"
import Loader from './Loader'
import PopupContainer from './Modal.js'
import AddWindow from "../../components/general/AddWindow"
import UsersList from "./UsersList"

const ToolBar =({conflictName , id , handleAdd,isMediator,connectionUsers, isChat, groups, isInfo})=>{
    
    return(
        <div className="tb" >

            <PopupContainer 
                popContent={<AddWindow  groups={groups}/>}
                imgSrc='../../../assets/images/add_icon_dark.png'
                classStr='tb--btn'
                />
                <div className='centerizer'>
                    {isInfo?
                        <div>
                            <UsersList/>
                        </div>
                            :
                        <div className="tb--title" >
                            <h3 className="tb--name">{conflictName}</h3>
                            {id?<h4 className="tb--id">I.D. {id}</h4>:<Loader size='small' withLogo={false}/>}
                        </div>
                    }
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

