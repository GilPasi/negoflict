import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import {getPerm} from '../utils/permissions'
import { UserLandingPage,MediatorLandingPage,SuperUserLandingPage } from "./LendingPage";



const RequireAuth = ()=>{
    const user = useSelector(state=>state.user)
    const location = useLocation()

    const role = getPerm(user)
    const {id} = user
    

    switch(role){
        case 'user':
            return(
                id
                ? <UserLandingPage/>
                : <Navigate to='/login' state={{from: location}} replace />
            )
        case 'mediator':
                return(
                    id
                    ? <MediatorLandingPage/>
                    : <Navigate to='/login' state={{from: location}} replace />
                )
        case 'super_user':
            return(
                id
                ? <SuperUserLandingPage/>
                : <Navigate to='/login' state={{from: location}} replace />
            )
        default:
            return <Navigate to='/login' state={{from: location}} replace />
    }
   
}

export default RequireAuth


