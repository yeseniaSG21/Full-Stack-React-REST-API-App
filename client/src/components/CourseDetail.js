import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useNavigate, useParams } from 'react-router-dom';

/**
 * This component provides the "Course Detail" screen by:
    ** Retrieving the detail for a course from the REST API's /api/courses/:id route and rendering the course.
    ** Rendering a "Delete Course" button that sends a DELETE request to the REST API's /api/courses/:id route in order to delete a course. 
    ** Rendering an "Update Course" button for navigating to the "Update Course" screen.
**/

export default class CourseDetail extends Component {
    state = {
        course: [],
        user: []
    }

    // Invoked immediately after a component is mounted onto DOM 
    componentDidMount() {
        const { context } = this.props;
        const id = this.props.match.params.id;

        context.data.getCourse(id)
            .then(data => {
                if (data) {
                    this.setState({ course: data });
                    this.setState({ user: data.User });
                } else {
                    this.props.history.push('/notfound');
                }
            })
            .catch(error => {
                console.error(error);
                this.props.history.push('/error');
            })
    }

    render() {
        const { course, user } = this.state;
        const { context } = this.props;
        const authUser = context.authenticatedUser;

        return (
            <React.Fragment>
                <div>
                    <Link>

                    </Link>
                </div>
            </React.Fragment>
        );
    }
}