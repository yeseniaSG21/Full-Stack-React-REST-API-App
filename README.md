# Full-Stack-React-REST-API-App
 
This project uses React to create a client for the existing school database REST API (that was created in the previous project). The full stack application will provide a way for users to administer a school database containing information about courses: users can interact with the database by retrieving a list of courses, viewing detail for a specific course, as well as creating, updating and deleting courses in the database. In addition, the project will require users to create an account and sign in to make changes to the database. 
* The `markup` and `mockups` folders were used as a template for design specifics. 

### This project uses:
- React - Hooks, React Router, Context API, and Create React App
- JSX
- Basic Authentication
- Node.js

After using the Create React App tool to set up the initial project, steps taken were to:
* Use JavaScript and JSX to build out the components for the application in a modular fashion
* Use React Router to set up routes
* Use the Fetch API or a tool like Axios to fetch data from the REST API
* Use basic authentication to support users signing in and allow new users to sign up
* Add to the supplied CSS to personalize the project

## To run project:
First, install project's dependencies:

```bash
  npm install
```
Next, populate the database:

```bash
  npm run seed
```
Lastly, launch the application:

```bash
  npm start
```