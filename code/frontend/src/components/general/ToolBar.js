import "../../styles/components/toolbar.css"
import Loader from './Loader'
import PopupContainer from './Modal.js'
import AddWindow from "../../components/general/AddWindow"
import UsersList from "./UsersList.js"
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {getPermName} from "../../utils/permissions";

const ToolBar =({isInfo,handleSelctedUser})=>{
    //hooks================
    const location = useLocation()
    //=====================

    //state================
     const { groups } = location.state ?? []
    const { caseId, caseCategory} = location.state ?? ''
    const {role} = useSelector(state=>state.user)
    //=====================

    //values================
     const roleName = getPermName({role})
    const isMediator = roleName==='mediator'
    //======================


    return(
        <div className="tb" >

            {isMediator&&<PopupContainer 
                popContent={<AddWindow  groups={groups || ''} />}
                imgSrc='../../../assets/images/add_icon_dark.png'
                classStr='tb--btn'
            />}

                {isInfo?
                    <div>
                        <UsersList handleSelctedUser={handleSelctedUser} isMediator={isMediator} fontSize="0.5em"/>
                    </div>
                        :
                    <div className="tb--title" >
                        <h3 className="tb--name">{`A ${caseCategory} conflict`}</h3>
                        {caseId?<h4 className="tb--id">I.D. {caseId.slice(-7)}</h4>:<Loader size='small' withLogo={false}/>}
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

