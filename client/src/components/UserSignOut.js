import React, { useEffect } from 'react';
import { redirect } from 'react-router-dom';

/**
 * This component doesn't render any visual elements. 
    ** Instead, it signs out the authenticated user.
    ** Redirects the user to the default route (i.e. the list of courses).
**/

export default ({context}) => {
    // component calls signOut and updates state after render
    useEffect(() =>  context.actions.signOut());

    return (
        <redirect to='/' />
    );
};