import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface LayoutProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ isAuthenticated, children }) => {
  return (
    <div className="App">
      <Header title='My App' isAuthenticated={isAuthenticated} />
      {children}
      <Footer />
    </div>
  );
};
export default Layout;
