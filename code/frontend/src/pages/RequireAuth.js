import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { Store } from "../store/index";



const RequireAuth = ()=>{
    const user = useSelector(state=>state.user)
    const location = useLocation()


    return(
        user.id
        ? <Outlet />
        : <Navigate to='/login' state={{from: location}} replace />
    )
}

export default RequireAuth


