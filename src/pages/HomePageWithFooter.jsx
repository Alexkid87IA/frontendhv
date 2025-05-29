import React from 'react';
import { HomePage } from './HomePage';

const HomePageWithFooter = () => {
  return (
    <div>
      <HomePage />
      <div style={{
        backgroundColor: 'red',
        color: 'white',
        padding: '30px',
        textAlign: 'center',
        marginTop: '40px',
        position: 'relative',
        zIndex: 9999
      }}>
        <h3 style={{ marginBottom: '10px' }}>HIGH VALUE FOOTER TEST</h3>
        <p>© 2025 High Value. Tous droits réservés.</p>
      </div>
    </div>
  );
};

export default HomePageWithFooter;
