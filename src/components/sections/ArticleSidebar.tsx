import React from 'react';
import { SanityAuthor, SanityArticle } from '../../pages/ArticlePage'; // Ajustez le chemin si nécessaire
import { urlFor } from '../../utils/sanityImage';
import { Link } from 'react-router-dom';
import { RelatedArticles } from './RelatedArticles'; // Assurez-vous que ce composant est adapté

interface ArticleSidebarProps {
  author?: SanityAuthor | null;
  relatedArticles?: SanityArticle[];
  // tableOfContents?: { id: string; title: string; level: number }[]; // Pour la TOC dynamique
}

const ActionButton: React.FC<{ icon: string; label: string; count?: number; onClick?: () => void, isActive?: boolean }> = ({ icon, label, count, onClick, isActive }) => (
  <button 
    onClick={onClick} 
    className={`flex flex-col items-center text-xs transition-colors duration-200 ease-in-out group ${isActive ? 'text-accent-violet' : 'text-gray-400 hover:text-white'}`}>
    <span className="material-icons-outlined text-2xl mb-1 group-hover:scale-110 transition-transform">{icon}</span>
    <span>{label}</span>
    {count !== undefined && <span className="text-sm font-medium">{count}</span>}
  </button>
);

export const ArticleSidebar: React.FC<ArticleSidebarProps> = ({ author, relatedArticles }) => {
  const authorData = author ? {
    name: author.name,
    role: "Fondateur & Rédacteur en chef", // Exemple, à rendre dynamique si possible
    image: author.image,
    bio: author.bio,
    slug: author.slug?.current,
    stats: {
      articles: 45, // Exemple, à rendre dynamique
      podcasts: 120,
      followers: "50K+"
    }
  } : null;

  const relatedArticlesData = relatedArticles?.map(relArt => ({
    slug: relArt.slug?.current || "#",
    title: relArt.title,
    image: relArt.mainImage,
    summary: relArt.excerpt || "",
    date: relArt.publishedAt ? new Date(relArt.publishedAt).toLocaleDateString("fr-FR", { day: 'numeric', month: 'short' }) : "",
    // category: relArt.categories && relArt.categories[0] ? relArt.categories[0].title : "Non catégorisé"
  })) || [];

  // Placeholder pour la TOC, à rendre dynamique plus tard
  const tableOfContents = [
    { id: "introduction", title: "Introduction", level: 1 },
    { id: "penser-entrepreneur", title: "Penser comme un entrepreneur", level: 2 },
    { id: "doute-foi", title: "Entre doute et foi", level: 2 },
    { id: "conclusion", title: "Conclusion", level: 1 },
  ];

  return (
    <aside className="w-full lg:w-1/3 space-y-10 sticky top-28 h-[calc(100vh-7rem)] overflow-y-auto pb-16 pr-2 custom-scrollbar">
      {/* Bloc Auteur amélioré */}
      {authorData && (
        <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/50 p-6 rounded-xl shadow-2xl border border-gray-700/50">
          <div className="flex flex-col items-center text-center mb-5">
            {authorData.image && (
              <img 
                src={urlFor(authorData.image).width(100).height(100).fit('crop').auto('format').url()} 
                alt={authorData.name} 
                className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-accent-violet shadow-lg transform group-hover:scale-105 transition-transform duration-300"
              />
            )}
            <h3 className="text-2xl font-bold text-white mb-1">{authorData.name}</h3>
            <p className="text-sm text-accent-violet font-medium">{authorData.role}</p>
          </div>
          <div className="flex justify-around text-center my-6 py-4 bg-gray-700/60 rounded-lg shadow-inner">
            {[ { label: "Articles", value: authorData.stats.articles }, { label: "Podcasts", value: authorData.stats.podcasts }, { label: "Followers", value: authorData.stats.followers }].map(stat => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
          {authorData.bio && (
            <p className="text-sm text-gray-300 mb-6 leading-relaxed text-center px-2">
              {typeof authorData.bio === 'string' ? authorData.bio : 'Bio à configurer dans Sanity.'}
            </p>
          )}
          {authorData.slug && (
            <Link 
              to={`/auteur/${authorData.slug}`}
              className="block w-full text-center bg-accent-violet hover:bg-accent-violet-dark focus:ring-4 focus:ring-accent-violet/50 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Voir le profil
            </Link>
          )}
        </div>
      )}

      {/* Bloc Actions (inspiré des captures) */}
      <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/50 p-5 rounded-xl shadow-2xl border border-gray-700/50">
        <h4 className="text-xl font-semibold text-white mb-4 text-center">Actions Rapides</h4>
        <div className="flex justify-around items-center">
          <ActionButton icon="favorite_border" label="Aimer" count={128} onClick={() => console.log('Like action')} />
          <ActionButton icon="bookmark_border" label="Sauver" onClick={() => console.log('Bookmark action')} />
          <ActionButton icon="share" label="Partager" onClick={() => console.log('Share action')} />
        </div>
      </div>
      
      {/* Table des Matières (Stylisée) */}
      {tableOfContents.length > 0 && (
        <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/50 p-5 rounded-xl shadow-2xl border border-gray-700/50">
          <h4 className="text-xl font-semibold text-white mb-4">Sur cette page</h4>
          <nav>
            <ul className="space-y-2">
              {tableOfContents.map((item) => (
                <li key={item.id} className={`ml-${(item.level - 1) * 4}`}> {/* Indentation based on level */}
                  <a 
                    href={`#${item.id}`} 
                    className="block text-sm text-gray-400 hover:text-accent-violet hover:translate-x-1 transition-all duration-200 ease-in-out py-1 rounded"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {/* Articles Similaires */}
      {relatedArticlesData.length > 0 && (
        <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/50 p-5 rounded-xl shadow-2xl border border-gray-700/50">
          <h4 className="text-xl font-semibold text-white mb-5 text-center">À lire aussi</h4>
          <RelatedArticles articles={relatedArticlesData} />
        </div>
      )}
    </aside>
  );
};

export default ArticleSidebar;

