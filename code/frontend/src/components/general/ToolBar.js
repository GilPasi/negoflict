import "../../styles/components/toolbar.css"
import Loader from './Loader'
import PopupContainer from './Modal.js'
import AddWindow from "../../components/general/AddWindow"
import UsersList from "./UsersList.js"

const ToolBar =({conflictName,id,isMediator,groups,isInfo,handleSelctedUser})=>{
     console.log(groups)
    return(
        <div className="tb" >


            {isMediator&&<PopupContainer 
                popContent={<AddWindow  groups={groups || ''}/>}
                imgSrc='../../../assets/images/add_icon_dark.png'
                classStr='tb--btn'
            />}



                {isInfo?
                    <div>
                        <UsersList handleSelctedUser={handleSelctedUser} isMediator={isMediator}/>
                    </div>
                        :
                    <div className="tb--title" >
                        <h3 className="tb--name">{conflictName}</h3>
                        {id?<h4 className="tb--id">I.D. {id}</h4>:<Loader size='small' withLogo={false}/>}
                    </div>
                }

                
                
            {isMediator&&<div className="tb--btn">
                <img src={`../../../assets/images/search_icon_dark.png`}
                alt="Search button" 
                className="tb--btn-img"
                />
            </div>}
        </div>
        
        )
}
export default ToolBar

