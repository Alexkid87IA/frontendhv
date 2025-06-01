import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-r from-accent-blue to-accent-turquoise hover:from-accent-turquoise hover:to-accent-blue text-white shadow-lg shadow-accent-blue/25",
        secondary: "bg-white/10 hover:bg-white/20 text-white",
        outline: "bg-transparent border border-white/20 hover:border-white/40 text-white",
        ghost: "bg-transparent hover:bg-white/5 text-white",
        gradient: "relative group overflow-hidden",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3",
        lg: "px-8 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  to?: string;
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  target?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    to, 
    href, 
    icon, 
    iconPosition = 'right', 
    fullWidth = false,
    target,
    children, 
    ...props 
  }, ref) => {
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
          <ArrowRight size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} className="transform group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        )}
        
        {/* Gradient background for gradient variant */}
        {variant === 'gradient' && (
          <div className="absolute -inset-1 bg-gradient-to-r from-accent-blue via-accent-turquoise to-accent-blue rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-all duration-500 animate-tilt -z-10"></div>
        )}
      </>
    );
    
    // Wrapper pour l'animation
    const MotionWrapper = ({ children }: { children: React.ReactNode }) => (
      <motion.div
        whileHover={{ scale: props.disabled ? 1 : 1.02 }}
        whileTap={{ scale: props.disabled ? 1 : 0.98 }}
        className={fullWidth ? "w-full" : ""}
      >
        {children}
      </motion.div>
    );
    
    // Classes communes
    const allClasses = cn(
      buttonVariants({ variant, size }),
      fullWidth && "w-full",
      props.disabled && "opacity-50 cursor-not-allowed",
      className
    );
    
    // Rendu conditionnel selon le type de bouton
    if (to) {
      return (
        <MotionWrapper>
          <Link
            to={props.disabled ? '#' : to}
            className={allClasses}
            onClick={props.disabled ? (e) => e.preventDefault() : props.onClick as any}
            aria-disabled={props.disabled}
          >
            {buttonContent}
          </Link>
        </MotionWrapper>
      );
    }
    
    if (href) {
      return (
        <MotionWrapper>
          <a
            href={props.disabled ? '#' : href}
            className={allClasses}
            onClick={props.disabled ? (e) => e.preventDefault() : props.onClick as any}
            target={target || "_blank"}
            rel="noopener noreferrer"
            aria-disabled={props.disabled}
          >
            {buttonContent}
          </a>
        </MotionWrapper>
      );
    }
    
    return (
      <MotionWrapper>
        <button
          ref={ref}
          className={allClasses}
          disabled={props.disabled}
          {...props}
        >
          {buttonContent}
        </button>
      </MotionWrapper>
    );
  }
);

Button.displayName = "Button";

export default Button;