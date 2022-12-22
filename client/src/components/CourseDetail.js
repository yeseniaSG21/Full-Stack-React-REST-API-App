import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Route, Routes } from 'react-router-dom';

/**
 * This component provides the "Course Detail" screen by:
    ** Retrieving the detail for a course from the REST API's /api/courses/:id route and rendering the course.
    ** Rendering a "Delete Course" button that sends a DELETE request to the REST API's /api/courses/:id route in order to delete a course. 
    ** Rendering an "Update Course" button for navigating to the "Update Course" screen.
**/

export default function CourseDetail() {
    // Allows us to create state variables in the React function component
    const [course, setCourse] = useState([]);




    return (
        <div>CourseDetail
            <Routes>
                <Route />
            </Routes>
        </div>
    );
}