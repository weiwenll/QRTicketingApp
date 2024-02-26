import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { loginUser } from '../../services/api';

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const navigate = useNavigate();
  // Function to validate email format
  const validateEmail = (email: string) => {
    // Define the regex pattern for email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Test the email against the pattern
    return emailRegex.test(email);
  };
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setEmailError('');
    setPasswordError('');
    setError('');
    setSuccess(false);

    // Basic validation checks
    if (!email || !password) {
      setError('All fields are required.');
      return;
    }
    
    // Validate email format
    if (!validateEmail(email)) {
      setEmailError('Invalid email format.');
      return;
    }
    
    const userData = {
      email,
      password,
      "role": "ROLE_USER"
    };
    
     loginUser(userData).then(data => {
      const { accessToken, refreshToken } = data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      setSuccess(true);
      setError('');

      setTimeout(() => {
        navigate('/home', { state: { isAuthenticated: true } });
      }, 1500);
    }).catch(error => {
      console.error(error);
      setError('Login failed. Please try again.'); // TODO: Update error message based on actual API error response
      setSuccess(false);
    });
  };
  const handleContinueAsGuest = () => {
    localStorage.setItem('isGuest', 'true');
    navigate('/home', { state: { isAuthenticated: false } });
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '330px' }}>
        <h3 className="text-center mb-3">Sign in</h3>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email *</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
           {emailError && <div className="text-danger">{emailError}</div>}
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
          {passwordError && <div className="text-danger">{passwordError}</div>}
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100 mb-3">
          Login
        </Button>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        {success && <div className="alert alert-success" role="alert">Login successful!</div>}
        <Form.Group className="text-muted text-center">
          Don't have an account? <a href="/register">Sign Up</a>
        </Form.Group>
        <Form.Group className="text-muted text-center mt-3">
        Or continue as a <a href="/home" onClick={handleContinueAsGuest}>Guest</a>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default RegisterForm;