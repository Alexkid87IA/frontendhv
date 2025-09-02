// src/components/article/ui/ShareModal.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Copy, Check, Twitter, Linkedin, Facebook, 
  MessageCircle, Send, Mail 
} from "lucide-react";
import { ShareLink } from "../../../types/article.types";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
  shareTitle: string;
  shareText: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ 
  isOpen, 
  onClose, 
  shareUrl, 
  shareTitle, 
  shareText 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 1000);
  };

  const shareLinks: ShareLink[] = [
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'hover:bg-blue-500/20 hover:text-blue-400',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'hover:bg-blue-700/20 hover:text-blue-600',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'hover:bg-blue-600/20 hover:text-blue-500',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'hover:bg-green-500/20 hover:text-green-400',
      url: `https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'hover:bg-sky-500/20 hover:text-sky-400',
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'hover:bg-purple-500/20 hover:text-purple-400',
      url: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          
          {/* Popup de partage adaptatif */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="fixed inset-x-4 bottom-20 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[90%] max-w-md bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl z-[101]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 md:p-6 border-b border-gray-700/50">
              <h3 className="text-lg md:text-xl font-semibold text-white">
                Partager cet article
              </h3>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>
            
            {/* Réseaux sociaux */}
            <div className="p-5 md:p-6 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {shareLinks.map((platform) => {
                  const Icon = platform.icon;
                  return (
                    <a
                      key={platform.name}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onClose}
                      className={`flex flex-col items-center gap-2 p-3 md:p-4 rounded-xl bg-white/5 border border-white/10 transition-all ${platform.color}`}
                    >
                      <Icon size={20} className="md:hidden" />
                      <Icon size={24} className="hidden md:block" />
                      <span className="text-[10px] md:text-xs text-gray-400">{platform.name}</span>
                    </a>
                  );
                })}
              </div>
              
              {/* Copier le lien */}
              <div className="pt-4 border-t border-gray-700/50">
                <p className="text-xs md:text-sm text-gray-400 mb-3">Ou copier le lien</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 px-3 py-2.5 md:px-4 md:py-3 bg-black/50 border border-gray-700 rounded-lg text-gray-300 text-xs md:text-sm"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-3 py-2.5 md:px-4 md:py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2 text-sm"
                  >
                    {copied ? <Check size={16} className="md:hidden" /> : <Copy size={16} className="md:hidden" />}
                    {copied ? <Check size={18} className="hidden md:block" /> : <Copy size={18} className="hidden md:block" />}
                    <span className="hidden sm:inline">{copied ? 'Copié!' : 'Copier'}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;