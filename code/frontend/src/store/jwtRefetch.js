import { updateAccessToken } from './slices/userSlice';
import { logout } from './index';
import { usersApi } from './api/usersApi'
//hen


export const jwtMiddleware = (storeAPI) => (next) => async (action) => {
    const result = next(action); // first let the action go through reducers

    // check if this action is the last one, a rejected one and it has a specific error message
    if (action.type.endsWith('/rejected') && action.error && action.payload.status === 401) {

        const originalAction = action.meta.arg.originalArgs.action;

        const {data:accessToken, error} = await storeAPI.dispatch(usersApi.endpoints.getNewAccess.initiate());
     
   
        if (!accessToken || error) {
            storeAPI.dispatch(logout());
            return result;
        } 

            // Update the access token in the redux state
            storeAPI.dispatch(updateAccessToken(accessToken.access));
            // Retry the original request
            storeAPI.dispatch(originalAction);
       
    }

    return result;
};