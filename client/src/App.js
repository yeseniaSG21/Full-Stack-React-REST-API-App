import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
const App = () => (
  <Router>
    <HeaderWithContext />
    <div>
      <Switch>
        <Route exact path='/' component={Courses} />
        <Route path='/courses/:id' component={CourseDetailWithContext} />

        <Route path='signin' component={} />
        <Route path='signup' component={} />
        <Route path='signout' component={} />
        <Route path='/notfound' component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default App;