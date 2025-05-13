// src/components/sections/ArticleContent_debug.tsx
import { PortableText } from '@portabletext/react';
import React from 'react';

interface ArticleContentProps {
  content: any; 
}

const ArticleContent: React.FC<ArticleContentProps> = ({ content }) => {
  console.log("--- DEBUG: ArticleContent composant est ENTRÉ ---"); // Log simple au début

  if (!content || (Array.isArray(content) && content.length === 0)) {
    console.log("ArticleContent: Contenu vide ou tableau vide. Retourne null.");
    return null; 
  }

  console.log("ArticleContent: Contenu reçu (avant PortableText):", JSON.stringify(content, null, 2));

  try {
    return (
      <div className="prose max-w-none">
        <PortableText value={content} />
      </div>
    );
  } catch (error) {
    console.error("ArticleContent: Erreur pendant le rendu de PortableText:", error);
    return <p>Erreur lors de l'affichage du contenu de l'article.</p>;
  }
};

export default ArticleContent;
