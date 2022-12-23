import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Form from './Form';

/**
 * This component provides the "Sign In" screen by:
    ** Rendering a form that allows a user to sign in using their existing account information, email and password. 
    ** Rendering a "Sign In" button that when clicked signs in the user.
    ** Rendering a "Cancel" button that returns the user to the default route (i.e. the list of courses).
**/

function UserSignIn(props) {
    const [ password, setPassword ] = useState('');
    const [ emailAddress, setEmailAddress ] = useState('');
    const [ errors, setErrors ] = useState([]);
    
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || { from: { pathname: '/' } };
    const { context } = props;;

    // Cancel function to redirect to the main course page
    const cancel = (event) => {
        navigate('/');   
    };

    // Submit function calls the createUser function from the api 
    const submit = () => {
        context.actions.signIn(emailAddress, password)
            .then(user => {
                if (user === null) {
                    setErrors(() => {
                        return [ 'Sign-in was unsuccessful' ];
                    });
                } else {
                    navigate(from, { replace: true });
                    console.log(`SUCCESS! ${emailAddress} is now signed in!`);
                }
            })
            .catch(error => {
                console.error(error);
                navigate('/');  //Redirect back to the main page
            });
    }

    return (
        <div className="form--centered">
            <h2>Sign In</h2>
            <Form 
                cancel={cancel}
                errors={errors}
                submit={submit}
                submitButtonText="Sign In"
                elements={() => (
                    <React.Fragment>
                        <label>Email Address</label>
                            <input 
                                id="emailAddress" 
                                name="emailAddress" 
                                type="email"
                                value={emailAddress} 
                                onChange={event => setEmailAddress(event.target.value)} 
                                placeholder="Email Address..." />
                        <label>Password</label>
                            <input 
                                id="password" 
                                name="password"
                                type="password"
                                value={password} 
                                onChange={event => setPassword(event.target.value)} 
                                placeholder="Password..." />                
                    </React.Fragment>
                )} />
            <p>
                Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
            </p>
        </div>
    );
}
    
export default UserSignIn;