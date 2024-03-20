import React from 'react';
import Layout from '../components/Layout';
import backgroundImage from '../assets/background.webp';
import { Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';

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
        }}
      >
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
        
        <Container style={{ position: 'relative', zIndex: 1 }}>
          <Tab.Container id="login-register-tabs" defaultActiveKey="login">
            <Row>
              <Col sm={8}>
                {/* Content on the left side */}
                <div>
                  <h2>Welcome</h2>
                  <p>This is some content on the left side.</p>
                </div>
              </Col>
              <Col sm={4}>
                <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '5px',}}>
                  <Nav variant="tabs">
                    <Nav.Item>
                      <Nav.Link eventKey="login">Login</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="register">Register</Nav.Link>
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
