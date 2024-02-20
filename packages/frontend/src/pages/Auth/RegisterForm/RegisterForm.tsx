import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { registerUser } from '../../../services/api';

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError('');
    setSuccess(false);

    // Basic validation checks
    if (!username || !phoneNumber || !email || !password) {
      setError('All fields are required.');
      return;
    }

    const userData = {
      "userName": username,
      phoneNumber,
      email,
      password,
      "role": "ROLE_USER"
    };

    registerUser(userData).then(data => {
      console.log(data);
    }).catch(error => {
      console.error(error);
    });
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '330px' }}>
        <h3 className="text-center mb-3">Create an account</h3>
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Name *</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formContactNumber" className="mb-3">
          <Form.Label>Contact Number *</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your contact number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email *</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password *</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label className="text-center">{!success && error}</Form.Label>
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100 mt-3 mb-3">
          Register
        </Button>
        <Form.Group className="text-muted text-center">
          Already have an account? <a href="/login">Sign in</a>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default RegisterForm;