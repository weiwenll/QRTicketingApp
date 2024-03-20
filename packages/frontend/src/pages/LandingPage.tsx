import React, { useState } from 'react';
import Layout from '../components/Layout';
import backgroundImage from '../assets/background.webp';
import { Container, Row, Col, Button } from 'react-bootstrap';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';

const LandingPage: React.FC = () => {
  return (
    <Layout>
      <main
        style={{
          /*backgroundImage: `url(${backgroundImage})`,*/
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: 'calc(100vh - 56px)',
        }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col>    
              <RegisterForm/>
            </Col>
            <Col>
              <LoginForm />
            </Col>
          </Row>
        </Container>
      </main>
    </Layout>
  );
};

export default LandingPage;
