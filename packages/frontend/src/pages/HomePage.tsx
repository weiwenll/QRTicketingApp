import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import backgroundImage from '../assets/background.webp';
import Layout from '../components/Layout';

const HomePage: React.FC  = () => {
  return (
    <Layout>
      <main style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: 'calc(100vh - 56px)' }}>             
      </main>
    </Layout>
  );
};

export default HomePage;
