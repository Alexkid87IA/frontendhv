import { useState, useEffect } from 'react';

export function useScrollDirection() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      // Toujours visible dans les 50 premiers pixels
      if (currentScrollY < 50) {
        setVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // Cacher la navbar quand on scroll vers le bas
      // Montrer la navbar quand on scroll vers le haut
      setVisible(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return { visible };
}