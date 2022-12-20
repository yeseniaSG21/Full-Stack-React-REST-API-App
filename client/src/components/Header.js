import React from 'react';
import { Link } from 'react-router-dom';

/**
 * This component displays the top menu bar for the application:
    ** Includes buttons for signing in and signing up (if there's not an authenticated user).
    ** Or the user's name and a button for signing out (if there's an authenticated user).
**/

export default class Header extends React.PureComponent {
    render() {
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        return (
            <div className="header">
            <div className="bounds">
                <h1 className="header--logo">MyAuth</h1>
                <nav>
                {authUser ? (       // Conditionally Render the Header Nav with authUser as the condition
                    <React.Fragment>      // if true
                    <span>Welcome, {authUser.name}!</span>
                    <Link to="/signout">Sign Out</Link>
                    </React.Fragment>
                ) : (
                    <React.Fragment>    // if false
                    <Link className="signup" to="/signup">Sign Up</Link>
                    <Link className="signin" to="/signin">Sign In</Link>
                    </React.Fragment>
                )}
                </nav>
            </div>
            </div>
        );
    }
};