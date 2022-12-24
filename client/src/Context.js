import React, { Component } from "react";
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext();

export class Provider extends Component {
    constructor() {
        super();
        this.data = new Data();
        this.state = {
            authenticatedUser: null
        };
        this.cookie = Cookies.get('authenticatedUser');
        this.state = {
            authenticatedUser: this.cookie ? JSON.parse(this.cookie) : null
        };
    }

    render() {
        const { authenticatedUser } = this.state;
        const value = {
            authenticatedUser,
            data: this.data,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut
            },
        };
        
        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>  
        );
    }

    /**
     * signIn() method used to create and set the appropriate Authorization header on future REST API requests.
        ** To authenticate the user, make a request to the REST API's /users endpoint.
        ** If the request to the REST API succeeds, then user credentials are valid. 
        ** If the server returns a "401 Unauthorized" HTTP status code, then user credentials are invalid.
    **/

    signIn = async (emailAddress, password) => {
        const user = await this.data.getUser(emailAddress, password);
        if (user != null) {
            user.password = password;
            this.setState(() => {
                return {
                    authenticatedUser: user,
                };
            });
            Cookies.set('authenticatedUser', JSON.stringify({...user, password}), {expires: 1});
        }
        return user;
    };

    /**
     * signOut() method removes the authenticated user and password from the global state.
    **/

    signOut = () => {
        this.setState({ authenticatedUser: null });
        Cookies.remove('authenticatedUser');
    };
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
    ** @param {class} Component - A React component.
    ** @returns {function} A higher-order component.
**/

export default function withContext(Component) {
    return function ContextComponent(props) {
        return (
        <Context.Consumer>
            {context => <Component {...props} context={context} />}
        </Context.Consumer>
        );
    }
}