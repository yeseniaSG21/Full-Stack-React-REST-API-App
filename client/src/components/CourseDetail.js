import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

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
                <div className="actions--bar">
                    <div className="wrap">
                        <Link></Link>
                        <Link></Link>
                    </div>
                </div>
                <div className="wrap">
                    <h2>Course Detail</h2>
                    <form>
                        <div className="main--flex">
                            <div>
                                <h3 className="course--detail--title">Course</h3>
                                <h4 className="course--name">{course.title}</h4>
                                <p>By {user.firstName} {user.lastName}</p>
                                <ReactMarkdown>{course.description}</ReactMarkdown>
                            </div>
                            <div>
                                <h3 className="course--detail--title">Estimated Time</h3>
                                <p>{course.estimatedTime}</p>
                                <h3 className="course--detail--title">Materials Needed</h3>
                                <ul className="course--detail--list">
                                    <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }

    // To delete a course
    delete = () => {
        const { context } = this.props;
        const user = context.authenticatedUser;

        context.data.deleteCourse(this.state.course.id, user.emailAddress, user.password)
            .then(() => {
                this.props.history.push('/');
            })
    };
}