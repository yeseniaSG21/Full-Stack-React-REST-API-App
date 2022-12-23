import React, { useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Form from './Form';

/**
 * This component provides the "Sign Up" screen by:
    ** Rendering a form that allows a user to sign up by creating a new account.
    ** Rendering a "Sign Up" button that when clicked sends a POST request to the REST API's /api/users route and signs in the user. 
    ** Rendering a "Cancel" button that returns the user to the default route (i.e. the list of courses).
**/

function UserSignUp(props) {
    const [ firstName, setfirstName ] = useState('');
    const [ lastName, setlastName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ emailAddress, setEmailAddress ] = useState('');
    const [ errors, setErrors ] = useState([]);
    const navigate = useNavigate();
    const { context } = props;

    // Cancel function to redirect to the main course page
    const cancel = () => {
        navigate('/');   
    };

    // Submit function calls the createUser function from the api 
    const submit = () => {
        // Create user
        const user = { firstName, lastName, emailAddress, password, errors };

        context.data.createUser(user)
            .then( errors => {
                if (errors.length) {
                    setErrors(errors);
                } else {
                    context.actions.signIn(emailAddress, password)
                        .then(() => {
                            navigate('/', { replace: true });    
                        });
                }
            })
            .catch((error) => {
                console.log(error);
                navigate('/error'); 
            });
    };

    return (
        <div className="form--centered">
            <h2>Sign Up</h2>
            <Form 
                cancel={cancel}
                errors={errors}
                submit={submit}
                submitButtonText="Sign Up"
                elements={() => (
                    <React.Fragment>
                        <label>First Name</label>
                            <input 
                                id="firstName" 
                                name="firstName" 
                                type="text"
                                value={firstName} 
                                onChange={event => setfirstName(event.target.value)}
                            />
                        <label>Last Name</label>
                            <input 
                                id="lastName" 
                                name="lastName" 
                                type="text"
                                value={lastName} 
                                onChange={event => setlastName(event.target.value)} 
                            />
                        <label>Email Address</label>
                            <input 
                                id="emailAddress" 
                                name="emailAddress"
                                type="email"
                                value={emailAddress} 
                                onChange={event => setEmailAddress(event.target.value)} 
                            />
                        <label>Password</label>
                            <input 
                                id="password" 
                                name="password"
                                type="password"
                                value={password} 
                                onChange={event => setPassword(event.target.value)} 
                            />
                    </React.Fragment>
                )} />
            <p>
                Already have a user account? Click here to <Link to="/signin">sign in</Link>!
            </p>
        </div>      
    );
}

export default UserSignUp;