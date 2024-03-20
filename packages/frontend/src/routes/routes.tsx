import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../components/Auth/LoginForm';
import RegisterPage from '../components/Auth/RegisterForm';
import Completion from '../components/QR/Payment/Completion';
import Payment from '../components/QR/Payment/Payment';
import ViewQRTickets from '../components/QR/Ticket/ViewQRTickets';
import PurchaseTicket from '../components/QR/Ticket/PurchaseTicket';
import Layout  from '../components/Layout';
import ViewTrainFare from '../components/QR/Fare/ViewTrainFare';
import LandingPage from '../pages/LandingPage';
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
     <Route path="/" element={<LandingPage/>} />
      <Route path="/home" element={<HomePage/>} />
      {/*<Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} /> */}      
      <Route path="/completion" element={<Completion />} />
      <Route path="/viewQRTickets" element={<ViewQRTickets />} />
      <Route path="/purchaseTicket" element={<PurchaseTicket />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/viewTrainFare" element={<ViewTrainFare />} />
      
    </Routes>
  );
};

export default AppRoutes;