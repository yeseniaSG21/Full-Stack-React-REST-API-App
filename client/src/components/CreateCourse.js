import React, { Component } from 'react';
import Form from './Form';

/**
 * This component provides the "Create Course" screen by
    ** Rendering a form that allows a user to create a new course.
    ** Rendering a "Create Course" button that when clicked sends a POST request to the REST API's /api/courses route. 
    ** Rendering a "Cancel" button that returns the user to the default route (i.e. the list of courses).
**/

export default class CreateCourse extends Component {
    state = {
        title: '',
        description: '',
        estimatedTime:'',
        materialsNeeded: '',
        errors: []
    };

    render() {
        const { context } = this.props;
        const { title, description, estimatedTime, materialsNeeded, errors } = this.state;
        const authUser = context.authenticatedUser;

        return (
            <div className="wrap">
                <h2>Create Course</h2>
                <Form
                    cancel={this.cancel}
                    errors={this.errors}
                    submit={this.submit}
                    submitButtonText='Create Course'
                    elements={() => (
                        <React.Fragment>
                            <div className="main--flex">
                                <div>
                                    <label>Course Title</label>
                                        <input 
                                            id='title' 
                                            name='title'
                                            type='text' 
                                            value={title}
                                            onChange={this.change}
                                        />
                                        <p>By {authUser.firstName} {authUser.lastName}</p>
                                    <label>Course Description</label>
                                        <textarea 
                                            id='description'
                                            name='description'
                                            type='text'
                                            value={description}
                                            onChange={this.change}
                                        />
                                </div>
                                <div>
                                    <label>Estimated Time</label>
                                        <input 
                                            id='estimatedTime' 
                                            name='estimatedTime' 
                                            type='text' 
                                            value={estimatedTime}
                                            onChange={this.change}
                                        />
                                    <label>Materials Needed</label>
                                        <textarea 
                                            id='materialsNeeded'
                                            name='materialsNeeded'
                                            type='text'
                                            value={materialsNeeded}
                                            onChange={this.change}
                                            />
                                </div>
                            </div>
                        </React.Fragment>
                    )}
                />
            </div>
        );
    }

    // Helper method to update the input fields
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    };

    // Send POST request
    submit = () => {
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        const userId = authUser.id;
        const authEmail = authUser.emailAddress;
        const authPassword = authUser.password;
        const { title, description, materialsNeeded, estimatedTime } = this.state;
        const course = {
            title,
            description,
            materialsNeeded,
            estimatedTime, 
            userId
        }

        // Access the createCourse from Data.js
        context.data
            .createCourse(course, authEmail, authPassword)
                .then(errors => {
                    if (errors.length) {
                        this.setState({errors});
                    } else {
                        this.props.history.push('/');
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.props.history.push('/error');
                })
    };

    // The "Cancel" Function
    cancel = () => {
        this.props.history.push('/');   // Redirect to main page
    };
}