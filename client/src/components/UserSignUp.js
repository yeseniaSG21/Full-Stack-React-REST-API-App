import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

/**
 * This component provides the "Sign Up" screen by:
    ** Rendering a form that allows a user to sign up by creating a new account.
    ** Rendering a "Sign Up" button that when clicked sends a POST request to the REST API's /api/users route and signs in the user. 
    ** Rendering a "Cancel" button that returns the user to the default route (i.e. the list of courses).
**/

export default class UserSignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        password: '',
        emailAddress: '',
        errors: [],
    }

    render() {
        const { firstName, lastName, password, emailAddress, errors } = this.state;
    
        return (
            <div className="form--centered">
                <h2>Sign Up</h2>
                <form>
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" defaultValue />
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" defaultValue />
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" defaultValue />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" defaultValue />
                        <button className="button" type="submit">Sign Up</button>
                        <button className="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
                </form>
                    <p>Already have a user account? Click here to <a href="sign-in.html">sign in</a>!</p>
            </div>
        )
    }
}