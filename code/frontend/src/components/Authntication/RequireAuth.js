import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import {getPerm} from '../../utils/permissions'



const RequireAuth = ()=>{
    const user = useSelector(state=>state.user)
    const location = useLocation()

    const role = getPerm(user)
    const {id} = user


    const auth = location.pathname.split('/')[1]


    if(role !== auth)
        return <Navigate to='/anauthhorized' state={{from: location}} replace={true}/>
    
    


        
    return(
        id
            ? <Outlet/>
            : <Navigate to='/login' state={{from: location}} replace={true} />
        )
   

    }
export default RequireAuth


