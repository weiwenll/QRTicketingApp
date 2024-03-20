import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import backgroundImage from '../assets/background.webp';
// import ModalForm from '../components/ModalForm';
import CustomNavbar from '../components/CustomNavbar';

interface HomePageProps {
  isAuthenticated: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ isAuthenticated }) => {
  
  const storedValue = localStorage.getItem('isAuthenticated');
  isAuthenticated = storedValue !== null && storedValue.toLowerCase() === 'true';

  return (
  <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', height: '100vh', width: '100vw' }}>    
      <CustomNavbar pageTitle="Home Page" isAuthenticated={isAuthenticated} />
      <Container style={{ marginTop: '20px' }}>
        <h1>Welcome to the Homepage</h1>
        <p>This is a simple homepage (to be edited later) and a logout button.</p>
      </Container>
    </div>
  );
}

export default HomePage;
