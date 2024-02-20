import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
// import LoginPage from '../pages/Auth/LoginForm/LoginForm';
import RegisterPage from '../pages/Auth/RegisterForm/RegisterForm';
// import NotFoundPage from './pages/NotFoundPage';

const AppRoutes: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const isGuest = localStorage.getItem('isGuest');
    const isAuthenticated = !!token;
    setIsAuthenticated(isAuthenticated);

    if (!token && !isGuest) {
      navigate('/register');
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/home" element={<HomePage isAuthenticated={isAuthenticated} />} />
      {/* <Route path="/login" element={<LoginPage />} /> */}
      <Route path="/register" element={<RegisterPage />} />
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};

export default AppRoutes;