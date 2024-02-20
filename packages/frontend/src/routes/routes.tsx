import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
// import LoginPage from '../pages/Auth/LoginForm/LoginForm';
import RegisterPage from '../pages/Auth/RegisterForm/RegisterForm';
// import NotFoundPage from './pages/NotFoundPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/login" element={<LoginPage />} /> */}
      <Route path="/register" element={<RegisterPage />} />
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};

export default AppRoutes;