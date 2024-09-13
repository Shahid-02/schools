import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashbord';
import  AllStudents from "./components/Students/AllStudents"
import "./index.css"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<LoginForm />} />
        <Route path="/allStudents" element={<AllStudents />} />

      </Routes>
    </Router>
  );
};

export default App;
