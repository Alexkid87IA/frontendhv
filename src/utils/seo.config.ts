interface SEOConfig {
  title: string;
  description: string;
  image: string;
}

export const staticSEO: Record<string, SEOConfig> = {
  home: {
    title: "Roger Ormières – Webzine Culture & Récits d'exception",
    description: "Explorez des récits de vie, des idées fortes, des portraits inspirants et des formats vidéo hors du commun. Le média de Roger Ormières.",
    image: "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2158442603/settings_images/2267772-a03-cc5b-56b1-6e0565bf3b8_e1fe347b-e16c-469d-b181-2b274cfb4c5a.png"
  },
  podcasts: {
    title: "Podcast – Roger Ormières",
    description: "Tous les épisodes du podcast de Roger Ormières : conversations puissantes avec des invités au parcours atypique.",
    image: "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2158442603/settings_images/podcast-cover.jpg"
  },
  emissions: {
    title: "Émissions – Roger Ormières",
    description: "Les émissions originales de Roger Ormières : portraits, formats longs et vidéos percutantes.",
    image: "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2158442603/settings_images/emissions-cover.jpg"
  },
  rogerSaid: {
    title: "Roger a dit – Tribunes & Lettres",
    description: "Les prises de parole de Roger Ormières : éditos, tribunes et lettres ouvertes.",
    image: "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2158442603/settings_images/editorial-cover.jpg"
  },
  recommendations: {
    title: "Ce que Roger recommande – Sélection culturelle",
    description: "Découvrez les livres, films, idées et innovations recommandées par Roger Ormières.",
    image: "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2158442603/settings_images/recommendations-cover.jpg"
  }
};

export const getSEOForCategory = (category: string): SEOConfig => {
  const categories: Record<string, SEOConfig> = {
    business: {
      title: "Business & Innovation | Décryptage des tendances et innovations",
      description: "Explorez les nouvelles frontières du business et de l'innovation. Analyses, success stories et insights sur les mutations qui façonnent le monde des affaires.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
    },
    mental: {
      title: "Mental | Développez un mental de champion",
      description: "Découvrez les clés mentales qui font la différence entre réussite et échec. Stratégies mentales, résilience et développement personnel.",
      image: "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&q=80"
    },
    society: {
      title: "Society | Décryptage des mutations contemporaines",
      description: "Explorez les tendances culturelles et les mouvements qui façonnent notre société. Art, littérature, musique et transformations sociales.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80"
    },
    story: {
      title: "Story | Histoires inspirantes et parcours d'exception",
      description: "Des histoires authentiques qui redéfinissent le possible. Découvrez des parcours inspirants, des success stories et des transformations remarquables.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
    }
  };

  return categories[category] || categories.business;
};