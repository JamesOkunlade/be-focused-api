import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';


import About from '../containers/About';
import Goal from '../containers/Goal';
import Goals from '../containers/Goals';
import GoalForm from './GoalForm';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import NotFound from '../containers/NotFound';
import Header from './Header';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={isAuthenticated ? <About /> : <Navigate to="/login" replace />} isAuthenticated={isAuthenticated} />
          <Route path="/goals/:goalId" element={isAuthenticated ? <Goal /> : <Navigate to="/login" replace />} isAuthenticated={isAuthenticated} />
          <Route path="/goals" element={isAuthenticated ? <Goals /> : <Navigate to="/login" replace />} isAuthenticated={isAuthenticated} />
          <Route path="/new" element={isAuthenticated ? <GoalForm /> : <Navigate to="/login" replace />} isAuthenticated={isAuthenticated} />
          <Route path="/edit" element={isAuthenticated ? <GoalForm /> : <Navigate to="/login" replace />} isAuthenticated={isAuthenticated} />
          <Route path="*" element={<NotFound />} />          
        </Routes>
      </BrowserRouter>
  );
}

export default App;