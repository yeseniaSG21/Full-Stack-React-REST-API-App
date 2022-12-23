import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import Components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';

// Import Context and Private Routes 
import withContext from './Context';
import PrivateRoute from './components/PrivateRoute';

// Context given to components
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

//This is our main App component that will build our database through routes 
const App = () => {
  return (
    <Router>
      <header>
        <HeaderWithContext />
      </header>
      <main>
        {
          <Routes>
            <Route element={<PrivateRoute />}>
                <Route path='/courses/:id/update' element={<UpdateCourseWithContext />} />
                <Route exact path='/courses/create' element={<CreateCourseWithContext />} />
            </Route>
              <Route exact path='/' element={<CoursesWithContext />} />
              <Route path='/courses/:id' element={<CourseDetailWithContext />} />
              <Route path='signin' element={<UserSignInWithContext />} />
              <Route path='signup' element={<UserSignUpWithContext />} />
              <Route path='signout' element={<UserSignOutWithContext />} />
              <Route path='/notfound' element={<NotFound />} />
              <Route path='*' element={<NotFound />} />
          </Routes>
        }
      </main>
    </Router>
  );
}

export default App;