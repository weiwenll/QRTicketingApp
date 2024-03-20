import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SessionUserData } from '../services/types';
import { getSessionUserData } from './Utils';
import { Button, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {

  const navigate = useNavigate();
  //Get session user data
  const sessionUserData = getSessionUserData();

  const handleLogoutClick = () => {
    localStorage.removeItem('sessionUserData');
    navigate('/');
    // Use `Link` for navigation
  };

  return (
    <Navbar expand="lg" className='navbar navbar-expand-lg navbar-dark bg-dark justify-content-end'>
      <Container>
        <Navbar.Brand href="/">Home Page</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {sessionUserData?.isAuthenticated === true &&
            (
              <Nav className="mr-auto">
                <NavDropdown title="QR Management" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/purchaseTicket">Purchase Tickets</NavDropdown.Item>
                  <NavDropdown.Item href="/viewQRTickets">View Tickets</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="User Management" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/user">User</NavDropdown.Item>
                  <NavDropdown.Item href="/role">Role</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Fare Management" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/viewTrainFare">Train Fare</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )
          }
          <Nav className="ms-auto">
            {sessionUserData?.isAuthenticated === true &&(
              <Button onClick={handleLogoutClick} variant="outline-primary" className="ml-auto">Logout</Button>
            ) }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
