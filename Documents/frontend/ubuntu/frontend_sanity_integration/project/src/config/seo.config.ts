interface SEOConfig {
  title: string;
  description: string;
  image: string;
}

interface RouteConfig {
  [key: string]: SEOConfig;
}

export const defaultSEO: SEOConfig = {
  title: "Roger Ormières | Média indépendant sur l'entrepreneuriat et l'innovation",
  description: "Explorez des récits inspirants, des réflexions sur le mindset et la culture entrepreneuriale avec Roger Ormières.",
  image: "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2158442603/settings_images/2267772-a03-cc5b-56b1-6e0565bf3b8_e1fe347b-e16c-469d-b181-2b274cfb4c5a.png"
};

export const routeSEO: RouteConfig = {
  "/": defaultSEO,
  "/articles": {
    title: "Articles | Roger Ormières",
    description: "Découvrez une collection d'articles sur l'entrepreneuriat, l'innovation et le développement personnel.",
    image: defaultSEO.image
  },
  "/rubrique/recits": {
    title: "Récits | Roger Ormières",
    description: "Des histoires authentiques qui inspirent et transforment notre vision du possible.",
    image: defaultSEO.image
  },
  "/rubrique/business": {
    title: "Business & Innovation | Roger Ormières",
    description: "Décryptez les tendances et innovations qui façonnent le monde des affaires.",
    image: defaultSEO.image
  },
  "/rubrique/mindset": {
    title: "Mindset | Roger Ormières",
    description: "Développez un mindset de champion avec des stratégies et conseils concrets.",
    image: defaultSEO.image
  },
  "/rubrique/culture": {
    title: "Culture | Roger Ormières",
    description: "Explorez les mutations culturelles qui transforment notre société.",
    image: defaultSEO.image
  },
  "/podcasts": {
    title: "Podcasts | Roger Ormières",
    description: "Écoutez des conversations inspirantes avec des personnalités exceptionnelles.",
    image: defaultSEO.image
  },
  "/emissions": {
    title: "Émissions | Roger Ormières",
    description: "Regardez nos émissions et interviews exclusives sur l'entrepreneuriat et l'innovation.",
    image: defaultSEO.image
  },
  "/roger-said": {
    title: "Roger a dit | Tribunes et réflexions",
    description: "Des mots pour réveiller, des idées pour secouer. Découvrez les tribunes de Roger Ormières.",
    image: defaultSEO.image
  },
  "/create-with-roger": {
    title: "Créer avec Roger | Production de contenu",
    description: "Créez du contenu authentique et impactant avec l'expertise de Roger Ormières.",
    image: defaultSEO.image
  },
  "/about": {
    title: "À propos | Roger Ormières",
    description: "Découvrez qui est Roger Ormières et sa vision pour un média indépendant qui inspire et transforme.",
    image: defaultSEO.image
  }
};