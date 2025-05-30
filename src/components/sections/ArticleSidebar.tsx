import React from 'react';
import { SanityAuthor, SanityArticle } from '../../pages/ArticlePage';
import { urlFor } from '../../utils/sanityClient';
import { Link } from 'react-router-dom';
import { RelatedArticles } from './RelatedArticles';
import { Heart, Bookmark, Share2, UserCircle, Edit3, BarChart2 } from 'lucide-react';

interface ArticleSidebarProps {
  author?: SanityAuthor | null;
  relatedArticles?: SanityArticle[];
}

const ActionButton: React.FC<{ icon: React.ReactNode; label: string; count?: number | string; onClick?: () => void, isActive?: boolean }> = ({ icon, label, count, onClick, isActive }) => (
  <button 
    onClick={onClick} 
    className={`flex flex-col items-center justify-center text-xs transition-colors duration-200 ease-in-out group w-20 h-20 sm:w-24 sm:h-24 rounded-lg ${isActive ? 'text-accent-violet bg-accent-violet/10' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'}`}>
    <div className="mb-1 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <span className="text-center block leading-tight">{label}</span>
    {count !== undefined && <span className="text-sm font-medium mt-0.5">{count}</span>}
  </button>
);

export const ArticleSidebar: React.FC<ArticleSidebarProps> = ({ author, relatedArticles }) => {
  const authorData = author ? {
    name: author.name,
    role: "Fondateur & Rédacteur en chef", 
    image: author.image,
    bio: author.bio,
    slug: author.slug?.current,
    stats: {
      articles: 45, 
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
  })) || [];

  const tableOfContents = [
    { id: "introduction", title: "Introduction", level: 1 },
    { id: "penser-entrepreneur", title: "Penser comme un entrepreneur", level: 2 },
    { id: "doute-foi", title: "Entre doute et foi", level: 2 },
    { id: "conclusion", title: "Conclusion", level: 1 },
  ];

  return (
    <aside className="w-full lg:w-80 xl:w-96 space-y-8 sticky top-24 lg:top-28 h-auto lg:h-[calc(100vh-7rem)] lg:overflow-y-auto pb-10 lg:pr-2 custom-scrollbar">
      {authorData && (
        <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/50 p-6 rounded-xl shadow-2xl border border-gray-700/50">
          <div className="flex flex-col items-center text-center mb-6">
            {authorData.image && (
              <img 
                src={urlFor(authorData.image).width(120).height(120).fit('crop').auto('format').url()} 
                alt={authorData.name} 
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full mb-5 object-cover border-4 border-accent-violet shadow-lg transform group-hover:scale-105 transition-transform duration-300"
              />
            )}
            <h3 className="text-2xl font-bold text-white mb-1.5">{authorData.name}</h3>
            <p className="text-sm text-accent-violet font-medium mb-4">{authorData.role}</p>
          </div>
          <div className="flex justify-around text-center mb-6 py-4 bg-gray-700/60 rounded-lg shadow-inner">
            {[ 
              { label: "Articles", value: authorData.stats.articles, icon: <Edit3 size={20} className="mb-1" /> }, 
              { label: "Podcasts", value: authorData.stats.podcasts, icon: <UserCircle size={20} className="mb-1" /> },
              { label: "Followers", value: authorData.stats.followers, icon: <BarChart2 size={20} className="mb-1" /> }
            ].map(stat => (
              <div key={stat.label} className="px-2 flex flex-col items-center">
                {stat.icon}
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">{stat.label}</p>
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
              className="block w-full text-center bg-accent-violet hover:bg-accent-violet-dark focus:ring-4 focus:ring-accent-violet/50 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg text-base"
            >
              Voir le profil
            </Link>
          )}
        </div>
      )}

      <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/50 p-6 rounded-xl shadow-2xl border border-gray-700/50">
        <h4 className="text-xl font-semibold text-white mb-5 text-center">Actions Rapides</h4>
        <div className="flex justify-around items-center space-x-2 sm:space-x-4">
          <ActionButton icon={<Heart size={24} />} label="Aimer" count={128} onClick={() => console.log('Like action')} />
          <ActionButton icon={<Bookmark size={24} />} label="Sauver" onClick={() => console.log('Bookmark action')} />
          <ActionButton icon={<Share2 size={24} />} label="Partager" onClick={() => console.log('Share action')} />
        </div>
      </div>
      
      {tableOfContents.length > 0 && (
        <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/50 p-6 rounded-xl shadow-2xl border border-gray-700/50">
          <h4 className="text-xl font-semibold text-white mb-5">Sur cette page</h4>
          <nav>
            <ul className="space-y-2">
              {tableOfContents.map((item) => (
                <li key={item.id} className={`ml-${(item.level - 1) * 4}`}> 
                  <a 
                    href={`#${item.id}`} 
                    className="block text-sm text-gray-400 hover:text-accent-violet hover:translate-x-1 transition-all duration-200 ease-in-out py-1.5 rounded"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {relatedArticlesData.length > 0 && (
        <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/50 p-6 rounded-xl shadow-2xl border border-gray-700/50">
          <h4 className="text-xl font-semibold text-white mb-6 text-center">À lire aussi</h4>
          <RelatedArticles articles={relatedArticlesData} />
        </div>
      )}
    </aside>
  );
};

export default ArticleSidebar;