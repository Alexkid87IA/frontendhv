import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  link?: {
    text: string;
    url: string;
  };
}

export const SectionHeader = ({ title, subtitle, link }: SectionHeaderProps) => {
  return (
    <div className="flex justify-between items-end mb-8">
      <div>
        <h2 className="section-title">{title}</h2>
        {subtitle && (
          <p className="text-tertiary mt-2">{subtitle}</p>
        )}
      </div>
      {link && (
        <Link
          to={link.url}
          className="flex items-center gap-2 text-accent-fuchsia hover:text-accent-cyan transition-colors"
        >
          <span>{link.text}</span>
          <ArrowRight size={18} />
        </Link>
      )}
    </div>
  );
};