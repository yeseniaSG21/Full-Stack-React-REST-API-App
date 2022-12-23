import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Form from './Form';

/**
 * This component provides the "Update Course" screen by:
    ** Rendering a form that allows a user to update one of their existing courses. 
    ** Rendering an "Update Course" button that when clicked sends a PUT request to the REST API's /api/courses/:id route. 
    ** Rendering a "Cancel" button that returns the user to the "Course Detail" screen.
**/

function UpdateCourse({ context }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [course, setCourse] = useState('');
    const [errors, setErrors] = useState([]);

    const authUser = context.authenticatedUser;
    const navigate = useNavigate();
    const userId = authUser.id;
    const { id } = useParams();

    // Fetch the course data to update
    useEffect(() => {
        context.data.getCourse(id)
        .then(course => {
            if (course) {
                if (course.userId !== context.authenticatedUser?.id) {
                    navigate('/notfound');
                }
                setCourse(course);
                setTitle(course.title);
                setDescription(course.description);
                setEstimatedTime(course.estimatedTime);
                setMaterialsNeeded(course.materialsNeeded);
            }   
        })
        .catch(error => {
            console.log(error);
        })
    }, []);

    // Function to handle update on the course 
    const update = () => {
        const course = {
            title,
            description,
            materialsNeeded,
            estimatedTime, 
            userId, 
            errors
        };

        // Access the updateCourse from Data.js
        context.data
            .updateCourse(id, course, authUser.emailAddress, authUser.password)
            .then(errors => {
                if (errors.length) {
                    setErrors(errors);
                } else {
                    navigate('/');
                }
            })
            .catch(error => {
                console.log(error);
            })
    };

    // Function to cancel update
    const cancel = () => {
        navigate(`/courses/${course.id}`);
    };

    return (
        <div className="wrap">
            <h2>Update Course</h2>
            <Form
                cancel={cancel}
                errors={errors}
                submit={update}
                submitButtonText='Update Course'
                elements={() => (
                    <React.Fragment>
                        <div className="main--flex">
                            <div>
                                <label>Course Title</label>
                                    <input 
                                        id="title" 
                                        name="title" 
                                        type="text" 
                                        value={title}
                                        onChange={event => setTitle(event.target.value)}
                                    />
                                    <p>By {authUser.firstName} {authUser.lastName}</p>

                                <label>Course Description</label>
                                    <textarea 
                                        id="description" 
                                        name="description" 
                                        type='text'
                                        value={description}
                                        onChange={event => setDescription(event.target.value)}
                                    />
                            </div>

                            <div>
                                <label>Estimated Time</label>
                                    <input 
                                        id="estimatedTime" 
                                        name="estimatedTime" 
                                        type="text" 
                                        defaultValue={estimatedTime}
                                        onChange={event => setEstimatedTime(event.target.value)}
                                    />

                                <label>Materials Needed</label>
                                    <textarea 
                                        id="materialsNeeded" 
                                        name="materialsNeeded" 
                                        defaultValue={materialsNeeded} 
                                        onChange={event => setMaterialsNeeded(event.target.value)}
                                    />
                            </div>
                        </div>
                    </React.Fragment>
                )}
            />
        </div>
    );
}

export default UpdateCourse;