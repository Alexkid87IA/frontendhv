import React from 'react';

interface ArticleContentProps {
  content: string;
}

export const ArticleContent: React.FC<ArticleContentProps> = ({ content }) => {
  return (
    <article className="prose prose-lg prose-invert max-w-none">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
};

export default ArticleContent;