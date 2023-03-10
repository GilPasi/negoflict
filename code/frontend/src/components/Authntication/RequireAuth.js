import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
<<<<<<< HEAD:code/frontend/src/components/Authntication/RequireAuth.js
import {getPerm} from '../../utils/permissions'
import { UserLandingPage,MediatorLandingPage,SuperUserLandingPage } from "../../pages/LendingPage";
=======
import {getPerm} from '../utils/permissions'
import { UserLandingPage,MediatorLandingPage,SuperUserLandingPage } from "./LandingPage";
>>>>>>> 48-create-case-page:code/frontend/src/pages/RequireAuth.js



const RequireAuth = ()=>{
    const user = useSelector(state=>state.user)
    const location = useLocation()

    const role = getPerm(user)
    const {id} = user
    

    switch(role){
        case 'user':
            return(
                id
                ? <Outlet/>
                : <Navigate to='/login' state={{from: location}} replace />
            )
        case 'mediator':
                return(
                    id
                    ? <Outlet/>
                    : <Navigate to='/login' state={{from: location}} replace />
                )
        case 'super_user':
            return(
                id
                ? <Outlet/>
                : <Navigate to='/login' state={{from: location}} replace />
            )
        default:
            return <Navigate to='/login' state={{from: location}} replace />
    }
   
}

export default RequireAuth


