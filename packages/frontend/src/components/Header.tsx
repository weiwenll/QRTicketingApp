import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  title: string;
  isAuthenticated: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, isAuthenticated }) => {
  const handleLogoutClick = () => {
    localStorage.removeItem('accessToken');
    // Use `Link` for navigation
  };

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-end">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="/logo192.png" alt="Your Logo" height="30" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav">
         
            {isAuthenticated ? (
              <>
                 <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>
              <li className="nav-item">
                <Link className="nav-link" to="/home" onClick={handleLogoutClick}>
                  Logout
                </Link>
              </li><li className="nav-item">
                  <Link className="nav-link" to="/payment">Payment</Link>
                </li></>
            ) : (
              /*<>
               <li className="nav-item btn btn-outline-primary" style={{ marginRight: '0.5rem' }}>
                  <Link className="nav-link"  to="/register"> Register</Link>
                </li>
                <li className="nav-item btn btn-outline-primary">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                
              </> */
              null
            )}
            {/* Add more navigation links as needed */}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
