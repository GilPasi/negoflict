import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import {getPermName} from '../../utils/permissions'



const RequireAuth = ()=>{
    const user = useSelector(state=>state.user)
    const location = useLocation()

    const role = getPermName(user)
    const {id} = user
    
    const auth = location.pathname.split('/')[1] || false

    if(role !== auth && id){
        if(!auth)
            return <Navigate to='/login' state={{from: location}} replace={true} />
        return <Navigate to='/unauthorised' state={{from: location}} replace={true}/>
    }
    else
        return(
            id
                ? <Outlet/>
                : <Navigate to='/login' state={{from: location}} replace={true} />
            )
    

    }
export default RequireAuth


