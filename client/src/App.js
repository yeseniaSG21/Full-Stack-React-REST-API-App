import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [ course, setCourse ] = useState(0);

  fetch('http://localhost:5000/api/courses') 
    .then(response => response.json())
    .then(responseData => {
      setCourse( responseData.forEach(course =>
        console.log(course.title) )
      )})
    .catch(err => {
      console.log( err );
    });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <ul><li>{ }</li></ul>
    </div>
  );
}

export default App;
