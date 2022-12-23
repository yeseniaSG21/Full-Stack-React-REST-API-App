import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams, useNavigate, Link } from 'react-router-dom';

/**
 * This component provides the "Course Detail" screen by:
    ** Retrieving the detail for a course from the REST API's /api/courses/:id route and rendering the course.
    ** Rendering a "Delete Course" button that sends a DELETE request to the REST API's /api/courses/:id route in order to delete a course. 
    ** Rendering an "Update Course" button for navigating to the "Update Course" screen.
**/

function CourseDetail({ context }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [ course, setCourse ] = useState([]);
    const [ firstName, setfirstName ] = useState('');
    const [ lastName, setlastName ] = useState('');
    const authUser = context.authenticatedUser;

    // Fetch course data with helper method getCourse
    useEffect(() => {
        context.data.getCourse(id)
            .then(data => {
                setCourse(data);
                setfirstName(data.User.firstName);
                setlastName(data.User.lastName);
            })
            .catch(error => {
                console.log(error);
            })
    }, [id, context, navigate]);
    
    
    // To delete a course via context
    const handleDelete = (event) => {
        event.preventDefault();
        const user = context.authenticatedUser;

        context.data.deleteCourse(id, user.emailAddress, user.password, course)
            .then(navigate('/'))
            .catch(error => {
                console.log(error);
                navigate('/error');
            })
    };

    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    {authUser && authUser.id === course.userId ? (
                        <>
                            <Link className='button' to={`/courses/${course.id}/update`}>
                                Update Course
                            </Link>
                            <Link to='/' className='button' onClick={handleDelete}>
                                Delete Course
                            </Link>

                            <Link to='/' className='button button-secondary'>
                                Return to List
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to='/' className='button button-secondary'>
                                Return to List
                            </Link>
                        </>
                    )}
                </div>
            </div>
            
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>By {firstName} {lastName}</p>
                            <ReactMarkdown children={course.description} />
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                <ReactMarkdown children={course.materialsNeeded} />
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default CourseDetail;