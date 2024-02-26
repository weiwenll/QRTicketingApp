import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../components/Auth/LoginForm';
import RegisterPage from '../components/Auth/RegisterForm';
// import NotFoundPage from './pages/NotFoundPage';

const AppRoutes: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    // const isGuest = localStorage.getItem('isGuest');
    const isAuthenticated = !!token;
    setIsAuthenticated(isAuthenticated);

    // if (!token && !isGuest) {
    //   navigate('/register');
    // }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/home" element={<HomePage isAuthenticated={isAuthenticated} />} />
      <Route path="/" element={<HomePage isAuthenticated={false} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};

export default AppRoutes;