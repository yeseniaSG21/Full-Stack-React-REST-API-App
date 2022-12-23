import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from '../Context';

/**
 * This high-order component will serve for any  proteced routes and make accessible to authenticated users only. 
     ** If user is authenticated, the user will be continue to the specified private component.
     ** If user is not authenticated, they will be redirected to the /signin route.
**/

export default ({ component: Component, ...rest }) => {
    return (
        <Consumer>
            {context => (
                <Route
                    {...rest}
                    render={props => context.authenticatedUser ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to={{
                            pathname: '/signin',
                            state: { from: props.location }
                        }} />
                    )
                    }
                />
            )}
        </Consumer>
    );
};