import "../../styles/components/toolbar.css"
import Loader from './Loader'
import PopupContainer from './Modal.js'
import AddWindow from "../../components/general/AddWindow"
import UsersList from "./UsersList.js"
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {getPermName} from "../../utils/permissions";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setSearchMsg, clearSearchMsg } from "../../store"

const ToolBar =({isInfo,handleSelctedUser})=>{
    //hooks================
    const location = useLocation()
    const dispatch = useDispatch()
    //=====================
    //state================
    const [isSearch,setIsSearch] = useState(false)
    const [searchTerm,searchTermSet] = useState('')
    //vars================
    const { groups } = location.state ?? []
    const { caseId, caseCategory} = location.state ?? ''
    const {role} = useSelector(state=>state.user)
    // const {activeGroup} = useSelector(state=>state.position)
    // const messages = useSelector(state=>state.chat[activeGroup])
    //=====================

    //values================
     const roleName = getPermName({role})
    const isMediator = roleName==='mediator'
    //======================

    useEffect(()=>{
        if(!isSearch || searchTerm===''){
            dispatch(clearSearchMsg())
            return
        }
        dispatch(setSearchMsg(searchTerm))
    },[isSearch,searchTerm])

    const handleSearch = ({currentTarget:input})=>{
        const {value} = input
        searchTermSet(value)
    }

    const styleWithInfo =isInfo&&!isMediator? {
        position:'absolute',
        right:'-13.5px',
        top:'8px',
    }:{}
    


    return(
        <div className="tb" >

            {!isMediator&&<div></div>}

            {isMediator&&<PopupContainer 
                popContent={<AddWindow  groups={groups || ''} />}
                imgSrc='../../../assets/images/add_icon_dark.png'
                classStr='tb--btn'
            />}


                <div  style={{position:"relative"}}>
                    {isInfo?
                        <div>
                            <UsersList handleSelctedUser={handleSelctedUser} isMediator={isMediator} fontSize="0.5em"/>
                        </div>
                            :
                        <div className="tb--title" >
                            <h3 className={`tb--name${isSearch?'-move':''}`}>{`A ${caseCategory} conflict`}</h3>
                            {caseId?<h4 className="tb--id">I.D. {caseId.slice(-7)}</h4>:<Loader size='small' withLogo={false}/>}
                        </div>
                    }
                </div>
                
            <div className={`tb--btn${isSearch?'-clicked':''}`} style={styleWithInfo} >
                <img  onClick={()=>setIsSearch(prev=>!prev)} src={`../../../assets/images/search_icon_dark.png`}
                alt="Search button" 
                className="tb--btn-img"
                />
            </div>
            
            <div className="tb-search" style={{position:'absolute'}} >
                <input onChange={handleSearch} className={`tb-search-input${!isSearch?'-hidden':''}`}></input>
                </div>
        </div>
        
        )
}
export default ToolBar

