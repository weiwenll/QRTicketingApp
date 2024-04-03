import React from 'react';
import backgroundImage from '../assets/background.webp';
import Layout from '../components/Layout';

const HomePage: React.FC  = () => {
  return (
    <main style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: 'calc(100vh - 56px)' }}>             
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
    </main>
  );
};

export default HomePage;
