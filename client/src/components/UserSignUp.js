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
        emailAddress: '',
        password: '',
        errors: [],
    }

    render() {
        const { firstName, lastName, emailAddress, password, errors } = this.state;
    
        return (
            <div className="form--centered">
                <h2>Sign Up</h2>
                <Form 
                    cancel={this.cancel}
                    errors={errors}
                    submit={this.submit}
                    submitButtonText="Sign Up"
                    elements={() => (
                        <React.Fragment>
                            <input 
                                id="firstName" 
                                name="firstName" 
                                type="text"
                                value={firstName} 
                                onChange={this.change} 
                                placeholder="First Name" />
                            <input 
                                id="lastName" 
                                name="lastName" 
                                type="text"
                                value={lastName} 
                                onChange={this.change} 
                                placeholder="Last Name" />
                            <input 
                                id="emailAddress" 
                                name="emailAddress"
                                type="text"
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
                    Already have a user account? Click here to <Link to="/signin">sign up</Link>!
                </p>
            </div>      
        )
    }

    // Changes the state of the name with each input
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState(() => {
            return {
                [name]: value
            };
        });
    };
    
    // Submit function calls the createUser function from the api 
    submit = () => {
        const { context } = this.props;
        const { firstName, lastName, emailAddress, password } = this.state;
    
        // Create user
        const user = { firstName, lastName, emailAddress, password };
    
        context.data.createUser(user)
            .then( errors => {
                if (errors.length) {
                    this.setState({ errors });
                } else {
                    context.actions.signIn(emailAddress, password)
                        .then(() => {
                            this.props.history.push('/users');    
                        });
                }
            })
            .catch((error) => {
                console.log(error);
                this.props.history.push('/error');  //push to history stack
            });
    };
    
    cancel = () => {
        this.props.history.push('/');   //redirect you to the main page
    };
}