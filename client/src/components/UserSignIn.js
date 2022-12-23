import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
    const { context } = props;;

// Create the Submit Function
submit = () => {
    const { context } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { emailAddress, password } = this.state;

    context.actions.signIn(emailAddress, password)
        .then((user) => {
            if (user === null) {
                this.setState(() => {
                    return { errors: [ 'Sign-in was unsuccessful' ] };
                });
            } else {
                this.props.history.push(from);
                console.log(`SUCCESS! ${emailAddress} is now signed in!`);
            }
        })
        .catch((error) => {
            console.error(error);
            this.props.history.push('/error');
        });
}

    // Write the "Cancel" Function
    cancel = () => {
        this.props.history.push('/');   // Redirect to main page
    };





    render() {
        const { emailAddress, password, errors } = this.state;

        return (
            <div className="form--centered">
                <h2>Sign In</h2>
                <Form 
                    cancel={this.cancel}
                    errors={errors}
                    submit={this.submit}
                    submitButtonText="Sign In"
                    elements={() => (
                        <React.Fragment>
                            <input 
                                id="emailAddress" 
                                name="emailAddress" 
                                type="email"
                                value={emailAddress} 
                                onChange={this.change} 
                                placeholder="Email Address" />
                            <input 
                                id="password" 
                                name="password"
                                type="password"
                                value={password} 
                                onChange={this.change} 
                                placeholder="Password" />                
                        </React.Fragment>
                    )} />
                <p>
                    Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
                </p>
            </div>
        );
    }
    
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    };
}

export default UserSignIn;