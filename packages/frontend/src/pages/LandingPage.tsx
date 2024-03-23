import React from 'react';
import Layout from '../components/Layout';
import backgroundImage from '../assets/background.webp';
import { Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';
import animatedImage from '../assets/home.png';

const LandingPage: React.FC = () => {
  return (
    <Layout>
      <main
        style={{
          position: 'relative',
          background: `url(${backgroundImage}) no-repeat center center fixed`,
          backgroundSize: 'cover',
          minHeight: 'calc(100vh - 56px)',
          padding: '20px', // Added padding for better spacing
          marginTop: '-50px' 
        }}
      >
          <style>
          {`
            .text-animation h2 {
              display: block;
              opacity: 0;
              animation: fadeInOut 5s infinite;
            }

            @keyframes fadeInOut {
              0% {
                opacity: 0;
              }
              50% {
                opacity: 1;
              }
              100% {
                opacity: 0;
              }
            }
          `}
        </style>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(155, 187, 241, 0.6)', // Adjust opacity if needed
          }}
        ></div>
        
        <Container style={{ position: 'relative', zIndex: 1}}>
          <Tab.Container id="login-register-tabs" defaultActiveKey="login">
            <Row>
              <Col sm={8}>
                {/* Content on the left side */}
                <div>
                  <div className="text-animation">
                    <h2 style={{ fontSize: '5em',color:'#00285a',marginTop:'60px'}}>SQRT </h2> 
                    <h2 style={{ fontSize: 'em', color: '#b65515' }}>for Seamless QR Ticketing System</h2>
                  </div>
                </div>
              </Col>
              <Col sm={4}>
                <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '5px',}}>
                  <Nav variant="tabs">
                    <Nav.Item>
                      <Nav.Link eventKey="login">Sign In</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="register">Sign Up</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content>
                    <Tab.Pane eventKey="login">
                      <LoginForm />
                    </Tab.Pane>
                    <Tab.Pane eventKey="register">
                      <RegisterForm />
                    </Tab.Pane>
                  </Tab.Content>
                </div>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </main>
    </Layout>
  );
};

export default LandingPage;
