import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, BookOpen, Briefcase, Brain, Users, Film } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useScrollDirection } from '../../hooks/useScrollDirection';

export const ResponsiveNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const location = useLocation();
  const { visible } = useScrollDirection();

  const menuItems = [
    { label: 'Story', path: '/rubrique/story', icon: BookOpen, slug: 'story' },
    { label: 'Business', path: '/rubrique/business', icon: Briefcase, slug: 'business' },
    { label: 'Mental', path: '/rubrique/mental', icon: Brain, slug: 'mental' },
    { label: 'Society', path: '/rubrique/society', icon: Users, slug: 'society' },
    { label: 'Émissions', path: '/emissions', icon: Film, slug: 'emissions' }
  ];

  // Reste du code inchangé...
  
  return (
    // Reste du JSX inchangé...
  );
};

export default ResponsiveNavbar;