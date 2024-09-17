// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Authentification/Login';
import ProtectedRoute from './Authentification/ProtectedRoute';
import CourseWrapper from './CourseWrapper';
import CourseList from './Course Components/CourseList';
import Navbar from './OtherComponents/Navbar';


const App = () => {
  return (
    <Router>
      <Navbar/>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/course/:id"
            element={
              <ProtectedRoute>
                  <CourseWrapper />
              </ProtectedRoute>
            }/>
          <Route path="/courses" element={<CourseList />} />
          <Route path="/" element={<CourseList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
