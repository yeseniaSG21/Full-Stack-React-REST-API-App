import React from 'react';
import { Route, Routes } from 'react-router-dom';

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
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const PrivateRouteWithContext = withContext(PrivateRoute);

//This is our main App component that will build our database through routes 
const App = () => {
  return (
    <>
    <HeaderWithContext />
    <Routes>
      <Route exact path='/' element={<Courses/>} />
      <Route path='/courses/:id' element={<CourseDetailWithContext/>} />
      <Route element={<PrivateRouteWithContext/>}>
        <Route path='/courses/:id/update' element={<UpdateCourseWithContext/>} />
        <Route exact path='/courses/create' element={<CreateCourseWithContext/>} />
      </Route>
      <Route path='signin' element={<UserSignInWithContext/>} />
      <Route path='signup' element={<UserSignUpWithContext/>} />
      <Route path='signout' element={<UserSignOutWithContext/>} />
      <Route path='/notfound' element={<NotFound/>} />
      <Route component={NotFound} />
    </Routes>
  </>
  );
}

export default App;