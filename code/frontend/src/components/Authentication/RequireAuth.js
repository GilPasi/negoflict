import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import {getPerm} from '../../utils/permissions'
<<<<<<< HEAD:code/frontend/src/components/Authentication/RequireAuth.js
import { UserLandingPage,MediatorLandingPage,SuperUserLandingPage } from "../../pages/LandingPage";
=======
import Cookies from 'js-cookie'
>>>>>>> ac5e3292828f2fabfbfba2b34af4bd35884e4071:code/frontend/src/components/Authntication/RequireAuth.js



const RequireAuth = ()=>{
    const user = useSelector(state=>state.user)
    const location = useLocation()

    const role = getPerm(user)
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


