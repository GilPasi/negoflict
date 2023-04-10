import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import {getPermName} from '../../utils/permissions'
import { UserLandingPage,MediatorLandingPage,SuperUserLandingPage } from "../../pages/LandingPage";


const RequireAuth = ()=>{
    const user = useSelector(state=>state.user)
    const location = useLocation()

    const role = getPermName(user)
    const {id} = user

    const auth = location.pathname.split('/')[1]
    if(role !== auth && id)
        return <Navigate to='/unauthorised' state={{from: location}} replace={true}/>

    else
        return(
            id
                ? <Outlet/>
                : <Navigate to='/login' state={{from: location}} replace={true} />
            )
    

    }
export default RequireAuth


