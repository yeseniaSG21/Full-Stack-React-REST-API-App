import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * This component provides the "Courses" screen by:
    ** Retrieving the list of courses from the REST API's /api/courses route
    ** Rendering a list of courses. Each course needs to link to its respective "Course Detail" screen. 
    ** Rendering a link to the "Create Course" screen.
 **/

function Courses(props) {
    const props = { context };
    const [courses, setCourses] = useState([]);

    // Fetch course data with helper method getCourses
    useEffect(() => {
        context.data.getCourses()
            .then(data => {
                this.setState({ courses: data });
            })
            .catch(error => {
                console.error(error);
                this.props.history.push('/error');
            })        
    }, [context.data] )

    return (
        <div className="wrap main--grid">
            {courses.map((course) => (
                <Link to={`/courses/${course.id}`} className="course--module course--link" key={course.id}>
                    <h2 className="course--label">Course</h2>
                    <h3 className="course--title">{course.title}</h3>
                </Link>
            ))}
            <Link to={`/courses/create`} className="course--module course--add--module">
                <span className="course--add--title">
                    <svg 
                        version="1.1" 
                        xmlns="http://www.w3.org/2000/svg" 
                        x="0px" 
                        y="0px" 
                        viewBox="0 0 13 13" 
                        className="add">
                        <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                    </svg>
                    New Course
                </span>
            </Link>
        </div>
    );
}

export default Courses;