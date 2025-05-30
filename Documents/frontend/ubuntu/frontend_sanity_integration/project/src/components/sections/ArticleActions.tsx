import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Bookmark, MessageCircle, Share2 } from 'lucide-react';
import { ShareButtons } from '../common/ShareButtons';

interface ArticleActionsProps {
  title: string;
  likes: number;
  hasLiked: boolean;
  isBookmarked: boolean;
  onLike: () => void;
  onBookmark: () => void;
  onShowComments: () => void;
}

export const ArticleActions = ({
  title,
  likes,
  hasLiked,
  isBookmarked,
  onLike,
  onBookmark,
  onShowComments
}: ArticleActionsProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-neutral-900/80 backdrop-blur-sm border-t border-white/10 py-4 z-50">
      <div className="container max-w-3xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onLike}
            className="flex items-center gap-2"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${hasLiked ? 'bg-red-500/20' : 'bg-white/5'}`}>
              <Heart
                size={20}
                className={hasLiked ? 'text-red-500 fill-current' : ''}
              />
            </div>
            <span className="text-sm text-tertiary">{likes}</span>
          </button>
          <button
            onClick={onBookmark}
            className="flex items-center gap-2"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isBookmarked ? 'bg-accent-blue/20' : 'bg-white/5'}`}>
              <Bookmark
                size={20}
                className={isBookmarked ? 'text-accent-blue fill-current' : ''}
              />
            </div>
          </button>
          <button 
            onClick={onShowComments}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5">
              <MessageCircle size={20} />
            </div>
            <span className="text-sm text-tertiary">24</span>
          </button>
        </div>
        <ShareButtons title={title} compact />
      </div>
    </div>
  );
};