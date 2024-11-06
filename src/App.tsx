import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useDispatch, useSelector } from 'react-redux';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
 
  const token = localStorage.getItem('token');
  const userId = useSelector((state: any) => state.auth && state.auth.user && state.auth.user.id);

  const [isAuthValid, setIsAuthValid] = useState<boolean>(Boolean(token || userId));

  useEffect(() => {
    setIsAuthValid(Boolean(token || userId));
  }, [isAuthValid, location.pathname, token, userId, dispatch])

  console.log('isAuthValid', isAuthValid)
  console.log('userId', userId)

  return (
    <div>
      <Routes>
        <Route path="/login" element={isAuthValid ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={isAuthValid ? <Navigate to="/" /> : <Signup />} />

        <Route path="/" element={isAuthValid ? <Home /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
