import  {useState, useMemo} from "react";
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";


const ChatPageA = ({isMediator})=>{
    //hooks==========
    const location = useLocation()
    //============

    //state=========
    const [activeGroup, setActiveGroup] = useState()

    //===========
    //values=======
    const caseId =useMemo(()=>{
         return location.state?.caseId ?? 'invalid case id'
    },[location.state])
    //==========

    //=======useEffect

    //==========




    return(
        <div></div>

    )

}

export default ChatPageA