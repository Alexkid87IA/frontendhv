import React from 'react';
import { Link } from 'react-router-dom';

const SimpleFooter = () => {
  return (
    <footer style={{ 
      backgroundColor: 'red', // Couleur très visible
      color: 'white', 
      padding: '50px', // Grand padding pour être sûr de le voir
      marginTop: '100px',
      borderTop: '5px solid black',
      fontSize: '24px' // Texte plus grand
    }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ marginBottom: '20px' }}>FOOTER TEST</h2>
        <p>© 2025 High Value. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export const Footer = SimpleFooter;
export default SimpleFooter;
