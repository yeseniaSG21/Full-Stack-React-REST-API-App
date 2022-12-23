import React from 'react';
import { Link } from 'react-router-dom';

/**
 * This component displays the top menu bar for the application:
    ** Includes buttons for signing in and signing up (if there's not an authenticated user).
    ** Or the user's name and a button for signing out (if there's an authenticated user).
**/

function Header(props) {
    const { context } = props;
    const authUser = context.authenticatedUser;

    return (
        <div className="wrap header--flex">
            <h1 className="header--logo">
                <Link to='/'>Courses</Link>
            </h1>
            <nav>
                {authUser ? (       // Conditionally Render the Header Nav with authUser as the condition
                    <React.Fragment>
                        <ul className='header--signedin'>
                            <li>Welcome, {authUser.firstName} {authUser.lastName}!</li>
                            <li><Link to="/signout">Sign Out</Link></li>
                        </ul>  
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <ul className='header--signedout'>
                            <li><Link className="signup" to="/signup">Sign Up</Link></li>
                            <li><Link className="signin" to="/signin">Sign In</Link></li>
                        </ul>
                    </React.Fragment>
                )}
            </nav>
        </div>
    );
};

export default Header;