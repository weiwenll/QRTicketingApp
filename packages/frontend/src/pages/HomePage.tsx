import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate, useLocation  } from 'react-router-dom';

interface HomePageProps {
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

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Home Page</Navbar.Brand>`
          {userAuthenticated && (
            <Nav className="ml-auto">
              <Button onClick={handleLogoutClick} variant="outline-primary">Logout</Button>
            </Nav>
          )}
          {!userAuthenticated && (
            <Nav className="ml-auto">
              <Button onClick={handleRegisterClick} variant="outline-primary" className="me-2">Register</Button>
              <Button onClick={handleLoginClick} variant="outline-primary">Login</Button>
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
}

export default HomePage;
