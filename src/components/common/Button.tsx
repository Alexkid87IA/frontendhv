import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  fullWidth?: boolean;
  ariaLabel?: string;
  target?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  className = '',
  icon,
  iconPosition = 'right',
  disabled = false,
  fullWidth = false,
  ariaLabel,
  target
}) => {
  // Définir les classes de base selon la variante
  const variantClasses = {
    primary: 'bg-gradient-to-r from-accent-blue to-accent-turquoise hover:from-accent-turquoise hover:to-accent-blue text-white shadow-lg shadow-accent-blue/25',
    secondary: 'bg-white/10 hover:bg-white/20 text-white',
    outline: 'bg-transparent border border-white/20 hover:border-white/40 text-white',
    ghost: 'bg-transparent hover:bg-white/5 text-white'
  };
  
  // Définir les classes de taille
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  };
  
  // Construire les classes
  const buttonClasses = `
    inline-flex items-center justify-center gap-2 
    rounded-xl font-semibold transition-all duration-300
    ${variantClasses[variant]} 
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `;
  
  // Contenu du bouton avec icône
  const buttonContent = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      {!icon && variant === 'primary' && iconPosition === 'right' && (
        <ArrowRight size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} aria-hidden="true" />
      )}
    </>
  );
  
  // Rendu conditionnel selon le type de bouton (lien interne, externe ou bouton)
  if (to) {
    return (
      <motion.div
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
      >
        <Link
          to={disabled ? '#' : to}
          className={buttonClasses}
          onClick={disabled ? (e) => e.preventDefault() : onClick}
          aria-disabled={disabled}
          aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
        >
          {buttonContent}
        </Link>
      </motion.div>
    );
  }
  
  if (href) {
    return (
      <motion.div
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
      >
        <a
          href={disabled ? '#' : href}
          className={buttonClasses}
          onClick={disabled ? (e) => e.preventDefault() : onClick}
          target={target || "_blank"}
          rel="noopener noreferrer"
          aria-disabled={disabled}
          aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
        >
          {buttonContent}
        </a>
      </motion.div>
    );
  }
  
  return (
    <motion.button
      type="button"
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
    >
      {buttonContent}
    </motion.button>
  );
};

export default Button;