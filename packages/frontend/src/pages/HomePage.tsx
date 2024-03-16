import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import backgroundImage from '../assets/background.webp';
// import ModalForm from '../components/ModalForm';

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

  const handleLoginClick = () => navigate('/login');

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', height: '100vh', width: '100vw' }}>
      <Navbar expand="lg" style={{ backdropFilter: 'blur(20px)' }}>
        <Container>
          <Navbar.Brand href="/" className="text-white">QR Ticketing App</Navbar.Brand>
          <Navbar.Toggle className='text-light ms-auto' aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                {userAuthenticated ? (
                  <>
                    <Nav.Link className='text-light mr-5'>Booking</Nav.Link>
                    <Nav.Link className='text-light mr-5'>Purchases</Nav.Link>
                    <Nav.Link href='/payment' className='text-light mr-5'>Payment</Nav.Link>
                    <Button onClick={handleLogoutClick} variant="outline-light" className='text-nowrap'>Logout</Button>
                  </>
                ) : (
                  <>
                    <Nav.Link href='/register' className='text-light mr-5'>Register</Nav.Link>
                    <Button onClick={handleLoginClick} style={{ width: 'fit-content' }} variant="light">Login</Button>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <section className='d-flex align-items-center justify-content-center'>
          {/* <ModalForm /> */}
          {/* <div className='text-white container py-5' style={{ backdropFilter: 'blur(5px)' }}>
            <div className='row g-4'>
              <div className='col-md-6'>
                <h1 className='display-1 text-nowrap'>Tour name</h1>

                <p className='text-base lead py-2 rounded-3 text-justify my-md-3'>Description</p>
              </div>
              <div className='col-md-6'>
                {/* <BookingForm destination={name} />
              </div>
            </div>
          </div> */}
        </section>

      </Container>
    </div>
  );
}

export default HomePage;
