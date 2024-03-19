import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import backgroundImage from '../assets/background.webp';
// import ModalForm from '../components/ModalForm';
import Layout from '../components/Layout';

/* interface HomePageProps {
  isAuthenticated: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userAuthenticated = location.state?.isAuthenticated || isAuthenticated || false;

  const handleLogoutClick = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const handleRegisterClick = () => navigate('/register');
  const handleLoginClick = () => navigate('/login');
  const handlePaymentClick = () => navigate('/payment');
  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', height: '100vh', width: '100vw' }}>
      <Navbar expand="lg" style={{ backdropFilter: 'blur(20px)' }}>
        <Container>
          <Navbar.Brand href="/">Home Page</Navbar.Brand>
          {userAuthenticated && (
            <Nav className="ml-auto">
              <Button onClick={handleLogoutClick} variant="outline-primary">Logout</Button>
            </Nav>
          )}
          {!userAuthenticated && (
            <Nav className="ml-auto">
              <Button onClick={handleRegisterClick} variant="outline-primary" className="me-2">Register</Button>
              <Button onClick={handleLoginClick} variant="outline-primary">Login</Button>
              <Button onClick={handlePaymentClick} variant="outline-primary">Payment</Button>
            </Nav>
          )}
        </Container>
      </Navbar>
      <Container style={{ marginTop: '20px' }}>
        <h1>Welcome to the Homepage</h1>
        <p>This is a simple homepage (to be edited later) and a logout button.</p>
      </Container>
    </div>
  );
} */

const HomePage: React.FC<{ isAuthenticated: boolean }> = ({ isAuthenticated }) => {
  return (
    <Layout isAuthenticated={isAuthenticated}>
      <main style={{ backgroundImage: `url('mrt2.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: 'calc(100vh - 56px)' }}>
      
          {/* Add your main content here */}
      <h1>Hello, World!</h1>
      <p>This is the main content area.</p>
    </main>
    </Layout>
  );
};


export default HomePage;
