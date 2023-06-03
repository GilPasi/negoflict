import { updateAccessToken } from './slices/userSlice';
import { logout } from './slices/userSlice'; 

export const jwtMiddleware = (storeAPI) => (next) => async (action) => {
    const result = next(action); // first let the action go through reducers
    console.log('action',action);
    console.log('result',result);
    console.log('store',storeAPI);
    console.log('next',next);


    // check if this action is the last one, a rejected one and it has a specific error message
    if (action.type.endsWith('/rejected') && action.error && action.payload.status === 401) {
        console.log('insssssss>>>>>>>>>>>>',action);
        const originalAction = action.meta.originalArgs.action;
        const state = storeAPI.getState();
        const refreshToken = state.user.refresh; // refresh token stored in state, get it from where you've stored
        console.log('refresh',refreshToken);
        console.log('state',state);
        console.log('action',action);
        console.log('originalAction',originalAction);
        console.log('storeAPI',storeAPI);
        console.log('result',result);
        // If refreshToken is also null, force logout.
        if (!refreshToken) {
            storeAPI.dispatch(logout());
            return result;
        } 

        // Here call your API to refresh token, I'm assuming you have a refreshToken endpoint that takes in refresh token and returns a new access token
        try {
            const response = await fetch('/api/refreshToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: refreshToken }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to refresh token');
            }
    
            const data = await response.json();
            const newAccessToken = data.access_token;

            // Update the access token in the redux state
            storeAPI.dispatch(updateAccessToken(newAccessToken));
            // Retry the original request
            storeAPI.dispatch(originalAction);
        } catch (error) {
            // Refresh failed, force logout
            storeAPI.dispatch(logout());
        }
    }

    return result;
};
