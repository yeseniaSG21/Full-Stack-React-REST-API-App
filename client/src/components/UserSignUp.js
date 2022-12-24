import React, { useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Form from './Form';

/**
 * This component provides the "Sign Up" screen by:
    ** Rendering a form that allows a user to sign up by creating a new account.
    ** Rendering a "Sign Up" button that when clicked sends a POST request to the REST API's /api/users route and signs in the user. 
    ** Rendering a "Cancel" button that returns the user to the default route (i.e. the list of courses).
**/

function UserSignUp({context}) {
    const [ firstName, setfirstName ] = useState('');
    const [ lastName, setlastName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ emailAddress, setEmailAddress ] = useState('');
    const [ errors, setErrors ] = useState([]);
    const navigate = useNavigate();

    // Function to handle change 
    const change = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;

        if (name === 'firstName') {
            setfirstName(e.target.value);
        } else if (name === 'lastName') {
            setlastName(value);
        } else if (name === 'emailAddress') {
            setEmailAddress(value);
        } else if (name === 'password') {
            setPassword(value);
        } else {
            return;
        }
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
                    context.actions
                    .signIn(emailAddress, password)
                    .then(() => {
                        navigate('/');    
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                navigate('/error'); 
            });
    };

    // Cancel function to redirect to the main course page
    const cancel = () => {
        navigate('/');   
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
                        <label htmlFor='firstName'>First Name</label>
                            <input 
                                id="firstName" 
                                name="firstName" 
                                type="text"
                                value={firstName} 
                                onChange={change}
                            />
                        <label htmlFor='lastName'>Last Name</label>
                            <input 
                                id="lastName" 
                                name="lastName" 
                                type="text"
                                value={lastName} 
                                onChange={change} 
                            />
                        <label htmlFor='emailAddress'>Email Address</label>
                            <input 
                                id="emailAddress" 
                                name="emailAddress"
                                type="email"
                                value={emailAddress} 
                                onChange={change} 
                            />
                        <label htmlFor='password'>Password</label>
                            <input 
                                id="password" 
                                name="password"
                                type="password"
                                value={password} 
                                onChange={change} 
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