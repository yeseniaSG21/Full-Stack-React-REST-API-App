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

                <Form>
                </Form>
            </div>
        );
    }
}