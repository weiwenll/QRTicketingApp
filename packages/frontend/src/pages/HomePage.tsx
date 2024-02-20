import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    
    navigate('/login');
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Home Page</Navbar.Brand>
          <Nav className="ml-auto">
            <Button onClick={handleLogout} variant="outline-primary">Logout</Button>
          </Nav>
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
