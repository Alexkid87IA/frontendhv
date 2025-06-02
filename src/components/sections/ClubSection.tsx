import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Crown, Users, Calendar, Brain, ArrowRight, Shield, Zap, Target, Star } from 'lucide-react';
import { getClubFeatures, getClubPricing } from '../../utils/sanityAPI';
import { SanityClubFeature, SanityClubPricing } from '../../types/sanity';
import { LoadingSpinner } from '../common/LoadingSpinner';
import ErrorBoundary from '../common/ErrorBoundary';

// Données mockées pour fallback
const mockedFeatures: SanityClubFeature[] = [
  {
    _id: "mock-feature-1",
    title: "Live hebdomadaire",
    description: "Sessions en direct avec des experts et entrepreneurs à succès",
    icon: "Calendar",
    order: 1
  },
  {
    _id: "mock-feature-2",
    title: "Mindset & Stratégie",
    description: "Développez votre psychologie de champion et votre vision business",
    icon: "Brain",
    order: 2
  },
  {
    _id: "mock-feature-3",
    title: "Veille exclusive",
    description: "Analyses approfondies et insights stratégiques",
    icon: "Shield",
    order: 3
  },
  {
    _id: "mock-feature-4",
    title: "Réseau privilégié",
    description: "Connexions avec des entrepreneurs et décideurs high value",
    icon: "Users",
    order: 4
  }
];

const mockedPricing: SanityClubPricing[] = [
  {
    _id: "mock-pricing",
    price: 19.90,
    currency: "EUR",
    period: "month",
    features: [
      "Accès à tous les contenus premium",
      "Participation aux lives hebdomadaires",
      "Accès à la communauté privée",
      "Veille stratégique exclusive"
    ],
    isActive: true
  }
];

// Composant pour rendre dynamiquement les icônes Lucide
const DynamicIcon = ({ name, ...props }: { name: string; [key: string]: any }) => {
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    Calendar,
    Brain,
    Shield,
    Users,
    Zap,
    Target,
    Star,
    Crown
  };

  const IconComponent = iconMap[name] || Users;
  return <IconComponent {...props} />;
};

export const ClubSection = () => {
  const [features, setFeatures] = useState<SanityClubFeature[]>([]);
  const [pricing, setPricing] = useState<SanityClubPricing | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'cms' | 'mock'>('cms');

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const [featuresResult, pricingResult] = await Promise.all([
          getClubFeatures(),
          getClubPricing()
        ]);
        
        if (featuresResult && featuresResult.length > 0) {
          setFeatures(featuresResult);
          setDataSource('cms');
          console.log("Fonctionnalités du club chargées depuis Sanity CMS");
        } else {
          setFeatures(mockedFeatures);
          setDataSource('mock');
          console.log("Aucune fonctionnalité trouvée dans Sanity");
        }
        
        if (pricingResult && pricingResult.length > 0) {
          setPricing(pricingResult[0]);
          console.log("Tarif du club chargé depuis Sanity CMS");
        } else {
          setPricing(mockedPricing[0]);
          setDataSource('mock');
          console.log("Aucun tarif trouvé dans Sanity");
        }
      } catch (err) {
        console.error("Erreur lors du chargement des données du club:", err);
        setError("Impossible de charger les informations du club");
        
        setFeatures(mockedFeatures);
        setPricing(mockedPricing[0]);
        setDataSource('mock');
        console.log("Utilisation des données mockées suite à une erreur");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchClubData();
  }, []);

  if (isLoading) {
    return (
      <section className="container py-20 flex justify-center items-center">
        <LoadingSpinner />
      </section>
    );
  }

  if (error && features.length === 0 && !pricing) {
    return (
      <section className="container py-20">
        <div className="text-center text-red-500">
          <p>{error}</p>
          <p className="mt-2">Veuillez réessayer ultérieurement.</p>
        </div>
      </section>
    );
  }

  const displayFeatures = features.length > 0 ? features : mockedFeatures;
  const displayPricing = pricing || mockedPricing[0];
  const isPromotion = displayPricing.price < 30;
  const regularPrice = isPromotion ? 39.90 : null;

  return (
    <ErrorBoundary>
      <section className="container py-20">
        <div className="relative overflow-hidden bg-gradient-to-br from-black via-black/95 to-black/90 rounded-3xl p-12 border border-white/10">
          {/* Enhanced Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,164,249,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,253,253,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,164,249,0.15),transparent_50%)]" />
            <div className="absolute inset-0 backdrop-blur-sm" />
          </div>

          {/* Content */}
          <div className="relative">
            {dataSource === 'mock' && (
              <div className="absolute top-2 right-2 text-xs text-amber-500 bg-black/50 px-2 py-1 rounded">
                Données de démonstration
              </div>
            )}
            
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* Left Column */}
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-block relative mb-6"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-accent-blue via-accent-turquoise to-accent-blue rounded-full blur opacity-75"></div>
                  <div className="relative inline-flex items-center gap-2 px-6 py-3 bg-black rounded-full text-accent-blue font-medium">
                    <Crown size={18} aria-hidden="true" />
                    <span>Club High Value</span>
                  </div>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                >
                  Rejoignez le Club{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-turquoise">High Value</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0"
                >
                  Développez votre mindset, votre business et votre réseau avec un accompagnement premium. 
                  Accédez à notre veille stratégique et à notre communauté d'entrepreneurs high value.
                </motion.p>

                {/* Prix avec effets améliorés */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 }}
                  className="mb-8 inline-block relative"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-accent-blue via-accent-turquoise to-accent-blue rounded-2xl blur opacity-30"></div>
                  <div className="relative bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    {isPromotion && (
                      <div className="flex items-center gap-2 mb-3">
                        <Star className="text-accent-blue" size={20} aria-hidden="true" />
                        <span className="text-accent-blue font-medium">Offre de lancement limitée</span>
                      </div>
                    )}
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-bold">{displayPricing.price.toFixed(2)}€</span>
                      <span className="text-gray-400">/{displayPricing.period === 'month' ? 'mois' : 'an'}</span>
                    </div>
                    <p className="text-sm text-gray-400">Pour les 100 premiers membres uniquement</p>
                    {isPromotion && regularPrice && (
                      <p className="text-xs text-gray-500 mt-2">Puis {regularPrice.toFixed(2)}€/{displayPricing.period === 'month' ? 'mois' : 'an'}</p>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <Link
                    to="/club"
                    className="group relative inline-flex items-center justify-center gap-2"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue via-accent-turquoise to-accent-blue rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                    <div className="relative flex items-center justify-center gap-2 bg-black px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300">
                      <span>Rejoindre le Club</span>
                      <ArrowRight size={20} aria-hidden="true" />
                    </div>
                  </Link>

                  <a
                    href="#discover"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
                  >
                    <span>En savoir plus</span>
                    <ArrowRight size={20} aria-hidden="true" />
                  </a>
                </motion.div>
              </div>

              {/* Right Column - Features with Enhanced Design */}
              <div className="lg:w-[450px]">
                <div className="grid gap-4" role="list" aria-label="Fonctionnalités du Club High Value">
                  {displayFeatures.map((feature, index) => (
                    <motion.div
                      key={feature._id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="group relative"
                      role="listitem"
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue via-accent-turquoise to-accent-blue rounded-xl blur opacity-30 group-hover:opacity-75 transition-all duration-300"></div>
                      <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-accent-blue to-accent-turquoise rounded-lg flex items-center justify-center flex-shrink-0">
                            <DynamicIcon name={feature.icon} size={24} className="text-white" aria-hidden="true" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1 group-hover:text-accent-blue transition-colors">{feature.title}</h3>
                            <p className="text-sm text-gray-400">{feature.description}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default ClubSection;