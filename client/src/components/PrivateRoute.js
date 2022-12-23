import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Consumer } from '../Context';

/**
 * This high-order component will serve for any  proteced routes and make accessible to authenticated users only. 
     ** If user is authenticated, the user will be continue to the specified private component.
     ** If user is not authenticated, they will be redirected to the /signin route.
**/

function PrivateRoute() {
    const location = useLocation();

    return (
        <Consumer>
            {context => 
                context.authenticatedUser ? (
                    <Outlet />
                ) : (
                    <Navigate
                        to={'/signin'}
                        state={ {from: location} }
                        replace
                    />
                )
            }
        </Consumer>
    );
};

export default PrivateRoute;