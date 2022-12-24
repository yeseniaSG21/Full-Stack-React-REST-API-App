import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from './Form';

/**
 * This component provides the "Create Course" screen by
    ** Rendering a form that allows a user to create a new course.
    ** Rendering a "Create Course" button that when clicked sends a POST request to the REST API's /api/courses route. 
    ** Rendering a "Cancel" button that returns the user to the default route (i.e. the list of courses).
**/

function CreateCourse({ context }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState([]);

    const authUser = context.authenticatedUser;
    const navigate = useNavigate();
    const userId = authUser.id;

    // The cancel function to navigate back to main route 
    const cancel = () => {
        navigate('/');
    };

    // Send POST request to create the new course
    const submit = () => {
        const course = {
            title,
            description,
            materialsNeeded,
            estimatedTime, 
            userId, 
            errors,
        };

        // Access the createCourse from Data.js
        context.data
            .createCourse(course, context.authenticatedUser.emailAddress, context.authenticatedUser.password)
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

    return (
        <div className="wrap">
            <h2>Create Course</h2>
            <Form
                cancel={cancel}
                errors={errors}
                submit={submit}
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
                                        onChange={event => setTitle(event.target.value)}
                                    />
                                    <p>By {authUser.firstName} {authUser.lastName}</p>

                                <label>Course Description</label>
                                    <textarea 
                                        id='description'
                                        name='description'
                                        type='text'
                                        value={description}
                                        onChange={event => setDescription(event.target.value)}
                                    />
                            </div>

                            <div>
                                <label>Estimated Time</label>
                                    <input 
                                        id='estimatedTime' 
                                        name='estimatedTime' 
                                        type='text' 
                                        value={estimatedTime}
                                        onChange={event => setEstimatedTime(event.target.value)}
                                    />

                                <label>Materials Needed</label>
                                    <textarea 
                                        id='materialsNeeded'
                                        name='materialsNeeded'
                                        type='text'
                                        value={materialsNeeded}
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

export default CreateCourse;