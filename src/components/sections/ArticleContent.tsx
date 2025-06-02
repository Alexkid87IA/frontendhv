import React from 'react';

interface ContentBlock {
  _type: string;
  style?: string;
  children: Array<{
    text: string;
    _type: string;
    marks?: string[];
  }>;
}

interface ArticleContentProps {
  content?: ContentBlock[] | any; // J'ai ajouté "any" pour accepter temporairement d'autres types
}

const ArticleContent: React.FC<ArticleContentProps> = ({ content }) => {
  // Vérification améliorée : on s'assure que content existe ET que c'est un tableau
  if (!content || !Array.isArray(content)) {
    return (
      <div className="prose prose-invert max-w-none">
        <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
          <p className="text-gray-400 mb-2">📄 Contenu de l'article en cours de chargement...</p>
          <p className="text-sm text-gray-500">Si le problème persiste, veuillez rafraîchir la page.</p>
        </div>
      </div>
    );
  }

  // Filtrer les blocs valides uniquement
  const validContent = content.filter(block => 
    block && 
    block._type && 
    block.children && 
    Array.isArray(block.children)
  );

  if (validContent.length === 0) {
    return (
      <div className="prose prose-invert max-w-none">
        <div className="p-6 bg-yellow-900/20 rounded-lg border border-yellow-700/50">
          <p className="text-yellow-400">⚠️ Le contenu de cet article semble vide ou mal formaté.</p>
        </div>
      </div>
    );
  }

  const renderBlock = (block: ContentBlock, index: number) => {
    // Vérification supplémentaire pour la sécurité
    if (!block || !block.children || !Array.isArray(block.children)) {
      return null;
    }

    const text = block.children.map(child => child?.text || '').join('');
    
    if (!text.trim()) return null;

    switch (block.style) {
      case 'h1':
        return (
          <h1 key={index} className="text-4xl font-bold text-white mb-6 mt-8">
            {text}
          </h1>
        );
      case 'h2':
        return (
          <h2 key={index} className="text-3xl font-bold text-white mb-4 mt-8 border-b border-gray-700 pb-2">
            {text}
          </h2>
        );
      case 'h3':
        return (
          <h3 key={index} className="text-2xl font-semibold text-gray-100 mb-3 mt-6">
            {text}
          </h3>
        );
      case 'h4':
        return (
          <h4 key={index} className="text-xl font-semibold text-gray-200 mb-2 mt-4">
            {text}
          </h4>
        );
      case 'blockquote':
        return (
          <blockquote key={index} className="border-l-4 border-blue-500 pl-4 py-2 my-6 bg-gray-900/50 rounded-r-lg">
            <p className="text-gray-300 italic text-lg">{text}</p>
          </blockquote>
        );
      default:
        return (
          <p key={index} className="text-gray-300 mb-4 leading-relaxed text-lg">
            {renderInlineContent(block.children)}
          </p>
        );
    }
  };

  const renderInlineContent = (children: ContentBlock['children']) => {
    // Vérification que children est bien un tableau
    if (!Array.isArray(children)) {
      return null;
    }

    return children.map((child, index) => {
      // Vérification que child existe et a du texte
      if (!child || typeof child.text !== 'string') {
        return null;
      }

      let element = child.text;
      
      if (child.marks && Array.isArray(child.marks)) {
        if (child.marks.includes('strong')) {
          return <strong key={index} className="text-white font-semibold">{element}</strong>;
        }
        
        if (child.marks.includes('em')) {
          return <em key={index} className="text-blue-300 italic">{element}</em>;
        }
        
        if (child.marks.includes('code')) {
          return (
            <code key={index} className="bg-gray-800 text-blue-400 px-2 py-1 rounded text-sm font-mono">
              {element}
            </code>
          );
        }
      }

      return <span key={index}>{element}</span>;
    });
  };

  return (
    <div className="prose prose-invert prose-lg max-w-none">
      <div className="space-y-4">
        {validContent.map((block, index) => renderBlock(block, index))}
      </div>
      
      {/* Section de conclusion automatique */}
      <div className="mt-12 p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-500/20">
        <h3 className="text-xl font-semibold text-white mb-3">💡 Points clés à retenir</h3>
        <ul className="space-y-2 text-gray-300">
          <li>• Les concepts abordés dans cet article sont essentiels pour votre développement</li>
          <li>• N'hésitez pas à pratiquer avec des exemples concrets</li>
          <li>• Rejoignez notre communauté pour poser vos questions</li>
        </ul>
      </div>
      
      {/* Call to action */}
      <div className="mt-8 text-center p-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/20">
        <h3 className="text-lg font-semibold text-white mb-2">Cet article vous a été utile ?</h3>
        <p className="text-gray-400 mb-4">Partagez-le avec votre réseau et aidez d'autres développeurs !</p>
        <div className="flex justify-center gap-4">
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            Partager
          </button>
          <button className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleContent;