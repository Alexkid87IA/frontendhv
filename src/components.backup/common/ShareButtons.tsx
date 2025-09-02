import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Facebook, Twitter, Linkedin, Copy, Check } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  className?: string;
  compact?: boolean;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ title, className = '', compact = false }) => {
  const [copied, setCopied] = React.useState(false);
  const url = window.location.href;

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: Share2,
      url: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
      color: 'hover:bg-[#25D366] hover:border-[#25D366]'
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      color: 'hover:bg-black hover:border-black'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: 'hover:bg-[#1877F2] hover:border-[#1877F2]'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      color: 'hover:bg-[#0A66C2] hover:border-[#0A66C2]'
    }
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={`flex ${compact ? 'flex-row gap-2' : 'flex-col gap-4 sm:flex-row sm:gap-2'} ${className}`}>
      {shareLinks.map((platform) => (
        <motion.a
          key={platform.name}
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-4 py-2 border border-neutral-700 rounded-full text-sm transition-colors ${platform.color} hover:text-white`}
          aria-label={`Partager sur ${platform.name}`}
          role="button"
        >
          <platform.icon size={16} />
          {!compact && <span>{platform.name}</span>}
        </motion.a>
      ))}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCopy}
        className={`flex items-center gap-2 px-4 py-2 border border-neutral-700 rounded-full text-sm transition-colors hover:bg-accent-violet hover:border-accent-violet hover:text-white ${
          copied ? 'bg-accent-violet border-accent-violet text-white' : ''
        }`}
        aria-label="Copier le lien"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
        {!compact && <span>{copied ? 'Lien copié !' : 'Copier le lien'}</span>}
      </motion.button>
    </div>
  );
};