import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Import Components
import Header from './components/Header';
import Form from './components/Form';
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




//This is our main App component that will build our database through routes 
const App = () => (
  <Router>
    <div>

      <Switch>
        <Route exact path='/' component={Courses} />
        <Route path='/courses/:id' component={} />

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