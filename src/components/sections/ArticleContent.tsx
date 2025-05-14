// src/components/sections/ArticleContent_color_corrected.tsx
import { PortableText } from "@portabletext/react";
import React from "react";

interface ArticleContentProps {
  content: any;
  className?: string; // Ajout pour flexibilité si besoin
}

const ArticleContent: React.FC<ArticleContentProps> = ({ content, className }) => {
  console.log("--- DEBUG: ArticleContent composant est ENTRÉ ---"); // Log simple au début

  if (!content || (Array.isArray(content) && content.length === 0)) {
    console.log("ArticleContent: Contenu vide ou tableau vide. Retourne null.");
    return null;
  }

  console.log("ArticleContent: Contenu reçu (avant PortableText):", JSON.stringify(content, null, 2));

  // Définition des composants personnalisés (si nécessaire à l'avenir)
  const customComponents = {
    // Par exemple, pour personnaliser les titres h2 :
    // h2: ({children}) => <h2 className="text-2xl font-bold text-blue-500">{children}</h2>,
  };

  try {
    return (
      <div className={`prose prose-invert max-w-none ${className || ""}`}>
        <PortableText value={content} components={customComponents} />
      </div>
    );
  } catch (error) {
    console.error("ArticleContent: Erreur pendant le rendu de PortableText:", error);
    return <p>Erreur lors de l'affichage du contenu de l'article.</p>;
  }
};

export default ArticleContent;

