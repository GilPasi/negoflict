import { updateAccessToken } from './slices/userSlice';
import { logout } from './index';
import axios from 'axios'
import history from '../components/Authentication/History'
//hen


export const jwtMiddleware = (storeAPI) => (next) => async (action) => {
    const result = next(action); // first let the action go through reducers
  

    // check if this action is the last one, a rejected one and it has a specific error message
    if (action.type.endsWith('/rejected') && action?.error && action.payload?.status === 401) {

        const originalAction = action.meta.arg.originalArgs.action;

        try{
        const {data} = await axios.post('/api/core/auth/token/refresh/',{withCredentials:true})

        storeAPI.dispatch(updateAccessToken(data.access));
        // Retry the original request
        storeAPI.dispatch(originalAction);
        }catch({response}){
        
            storeAPI.dispatch(logout());
            history.push('/login');
            return
        }
    }

    return result;
};
