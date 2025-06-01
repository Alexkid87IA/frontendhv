import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Camera, Video, Mic, Sparkles, Star, Users, Clock, Calendar, CheckCircle, Award, Zap, BookOpen } from 'lucide-react';

// Composants communs
import { NewsletterForm } from '../components/common/NewsletterForm';
import { Button } from '../components/common/Button';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export const CreateWithRogerPage = () => {
  return (
    <>
      <Helmet>
        <title>Votre histoire | Créez du contenu premium avec Roger Ormières</title>
        <meta name="description" content="Transformez votre expertise en contenu premium qui inspire et convertit. Une expérience de création unique avec Roger Ormières." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-40 pb-20 overflow-hidden">
        {/* Background avec effet de parallaxe */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/70" />
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img 
              src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop"
              alt="Studio de création" 
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.2),transparent_70%)]" />
        </div>
        
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20">
                <Sparkles size={16} className="text-accent-blue" />
                <span>Production de contenu premium</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Racontez <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-turquoise to-accent-blue">votre histoire</span> avec impact
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Transformez votre expertise en contenu professionnel qui inspire, engage et convertit. Une expérience de création unique avec Roger pour donner vie à votre vision.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  variant="primary" 
                  size="lg"
                  href="#booking"
                  icon={<Calendar size={20} />}
                >
                  Réserver une session
                </Button>
                
                <Button 
                  variant="secondary" 
                  size="lg"
                  href="#process"
                  icon={<ArrowRight size={20} />}
                >
                  Découvrir le processus
                </Button>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-accent-blue" />
                  <span>Équipement professionnel</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-accent-blue" />
                  <span>Accompagnement éditorial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-accent-blue" />
                  <span>Droits d'utilisation complets</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Video Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1607968565043-36af90dde238?q=80&w=2069&auto=format&fit=crop"
                  alt="Studio d'enregistrement professionnel"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                {/* Play Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-accent-blue rounded-full flex items-center justify-center shadow-lg hover:bg-accent-turquoise transition-colors group"
                  aria-label="Regarder la vidéo de présentation"
                >
                  <div className="relative">
                    <div className="absolute -inset-4 bg-accent-blue rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                    <Play size={32} className="text-white relative z-10 ml-1" />
                  </div>
                </motion.button>

                {/* Video Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold mb-2">Showreel 2024</h3>
                  <p className="text-sm text-gray-300">
                    Découvrez nos réalisations et le processus de création
                  </p>
                </div>
              </div>
              
              {/* Floating badges */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-6 -left-6 bg-gradient-to-br from-accent-blue to-accent-turquoise rounded-lg p-3 shadow-xl"
              >
                <Camera size={24} className="text-white" />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -top-6 -right-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-3 shadow-xl"
              >
                <Mic size={24} className="text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-black to-neutral-900">
        <div className="container">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <span className="inline-block px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/10">
              Nos services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Une offre complète de création de contenu
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Du concept à la distribution, nous vous accompagnons à chaque étape pour créer du contenu qui vous ressemble et qui résonne avec votre audience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Video className="text-white" size={24} />,
                title: "Vidéo Professionnelle",
                description: "Captation multi-caméras 4K, éclairage studio et montage professionnel pour des vidéos de qualité broadcast.",
                gradient: "from-blue-600 to-cyan-400"
              },
              {
                icon: <Mic className="text-white" size={24} />,
                title: "Podcast Premium",
                description: "Enregistrement audio haute définition, mixage et mastering pour un son cristallin sur toutes les plateformes.",
                gradient: "from-purple-600 to-pink-500"
              },
              {
                icon: <Camera className="text-white" size={24} />,
                title: "Photographie Éditoriale",
                description: "Séances photo professionnelles pour vos portraits, produits et contenus éditoriaux.",
                gradient: "from-amber-500 to-orange-600"
              },
              {
                icon: <BookOpen className="text-white" size={24} />,
                title: "Contenu Éditorial",
                description: "Rédaction d'articles, livres blancs et contenus éditoriaux optimisés pour le SEO et l'engagement.",
                gradient: "from-emerald-500 to-teal-400"
              },
              {
                icon: <Users className="text-white" size={24} />,
                title: "Formation & Coaching",
                description: "Accompagnement personnalisé pour développer votre présence médiatique et votre aisance face caméra.",
                gradient: "from-red-500 to-pink-500"
              },
              {
                icon: <Zap className="text-white" size={24} />,
                title: "Distribution Multi-Plateforme",
                description: "Stratégie de distribution optimisée pour maximiser la visibilité de vos contenus sur toutes les plateformes.",
                gradient: "from-indigo-600 to-blue-500"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                className="group relative"
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:border-white/20 transition-all duration-300">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6`}>
                    {service.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-accent-blue transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-400">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-neutral-900 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.2),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.15),transparent_70%)]" />
        
        <div className="container relative">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <span className="inline-block px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/10">
              Notre processus
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Une méthodologie éprouvée en 4 étapes
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              De la conception à la livraison, chaque étape est pensée pour créer un contenu authentique et impactant qui vous ressemble.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-accent-blue via-accent-turquoise to-accent-blue hidden lg:block" />
            
            {/* Process steps */}
            {[
              {
                title: "Stratégie & Brief",
                description: "Nous définissons ensemble vos objectifs, votre message clé et votre positionnement unique pour créer un contenu aligné avec votre vision.",
                icon: <BookOpen size={24} className="text-white" />,
                details: [
                  "Analyse de vos besoins et objectifs",
                  "Définition de votre audience cible",
                  "Élaboration de votre message clé",
                  "Choix des formats adaptés"
                ],
                gradient: "from-blue-600 to-cyan-400"
              },
              {
                title: "Préparation",
                description: "Un coaching personnalisé pour optimiser votre présence à l'écran, votre message et votre impact global.",
                icon: <Users size={24} className="text-white" />,
                details: [
                  "Coaching prise de parole",
                  "Préparation du script",
                  "Conseils style et posture",
                  "Répétition et ajustements"
                ],
                gradient: "from-purple-600 to-pink-500"
              },
              {
                title: "Production",
                description: "Tournage professionnel en studio avec équipement haut de gamme et équipe dédiée pour un résultat impeccable.",
                icon: <Camera size={24} className="text-white" />,
                details: [
                  "Studio professionnel équipé",
                  "Équipe technique experte",
                  "Multi-caméras 4K",
                  "Son broadcast"
                ],
                gradient: "from-amber-500 to-orange-600"
              },
              {
                title: "Post-production",
                description: "Montage expert, color grading et optimisation pour chaque plateforme afin de maximiser l'impact de votre contenu.",
                icon: <Video size={24} className="text-white" />,
                details: [
                  "Montage professionnel",
                  "Color grading cinéma",
                  "Sound design",
                  "Exports multi-formats"
                ],
                gradient: "from-emerald-500 to-teal-400"
              }
            ].map((step, index) => (
              <div key={index} className={`relative mb-20 last:mb-0 lg:mb-0`}>
                <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8`}>
                  {/* Timeline dot for desktop */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-neutral-800 border-4 border-accent-blue flex items-center justify-center z-10 hidden lg:flex">
                    <span className="text-xl font-bold text-accent-blue">{index + 1}</span>
                  </div>
                  
                  {/* Content */}
                  <motion.div 
                    className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}
                    {...fadeInUp}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center gap-4 mb-4 lg:hidden">
                      <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
                        <span className="text-lg font-bold text-accent-blue">{index + 1}</span>
                      </div>
                      <h3 className="text-2xl font-bold">{step.title}</h3>
                    </div>
                    
                    <h3 className={`text-2xl font-bold mb-4 hidden lg:block`}>{step.title}</h3>
                    <p className="text-gray-300 mb-6">{step.description}</p>
                    
                    <ul className={`space-y-2 ${index % 2 === 0 ? 'lg:ml-auto' : ''}`}>
                      {step.details.map((detail, i) => (
                        <li key={i} className={`flex items-center gap-2 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                          <div className={`w-1.5 h-1.5 rounded-full bg-accent-blue flex-shrink-0 ${index % 2 === 0 ? 'lg:order-2' : ''}`} />
                          <span className="text-gray-400">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                  
                  {/* Icon */}
                  <motion.div 
                    className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pl-16' : 'lg:pr-16 lg:flex lg:justify-end'}`}
                    {...fadeInUp}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mx-auto lg:mx-0`}>
                      {step.icon}
                    </div>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
        
        <div className="container relative">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <span className="inline-block px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/10">
              Témoignages
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ils ont créé avec Roger
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Découvrez les retours d'entrepreneurs et experts qui ont transformé leur présence médiatique grâce à notre accompagnement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "Travailler avec Roger a été une révélation. En une journée, nous avons créé plus de contenu de qualité que je n'en avais produit en 6 mois.",
                author: "Marie Laurent",
                role: "CEO & Fondatrice",
                company: "GrowthLab",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
                gradient: "from-blue-600 to-cyan-400"
              },
              {
                quote: "L'accompagnement va bien au-delà de la simple production. C'est une véritable transformation de ma façon de communiquer mon expertise.",
                author: "Thomas Dubois",
                role: "Expert Fintech",
                company: "NextGen Finance",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
                gradient: "from-purple-600 to-pink-500"
              },
              {
                quote: "La qualité du contenu produit a dépassé toutes mes attentes. Un investissement qui a transformé ma présence digitale et mon business.",
                author: "Sophie Bernard",
                role: "Consultante RH",
                company: "Human Forward",
                image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop",
                gradient: "from-amber-500 to-orange-600"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="group relative"
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:border-white/20 transition-all duration-300">
                  {/* Quote */}
                  <p className="text-gray-300 italic mb-6 relative">
                    <span className="absolute -top-4 -left-2 text-4xl text-accent-blue/20">"</span>
                    {testimonial.quote}
                    <span className="absolute -bottom-4 -right-2 text-4xl text-accent-blue/20">"</span>
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-white/10"
                    />
                    <div>
                      <h4 className="font-bold">{testimonial.author}</h4>
                      <p className="text-sm text-gray-400">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-b from-neutral-900 to-black relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.15),transparent_70%)]" />
        
        <div className="container relative">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <span className="inline-block px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/10">
              Nos offres
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Investissez dans votre histoire
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Des formules adaptées à vos besoins pour créer du contenu qui vous ressemble et qui résonne avec votre audience.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <motion.div
              className="group relative"
              {...fadeInUp}
            >
              {/* Animated Background Effects */}
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-blue via-accent-turquoise to-accent-blue rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-all duration-500 animate-tilt"></div>
              
              {/* Card Content */}
              <div className="relative bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-12 transition-all duration-500 hover:border-white/20">
                {/* Premium Badge */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-accent-blue to-accent-turquoise rounded-full flex items-center gap-2 shadow-lg">
                  <Star size={18} className="text-white" />
                  <span className="text-white font-semibold tracking-wide">Offre Premium</span>
                  <Star size={18} className="text-white" />
                </div>

                {/* Header */}
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold mb-4">Pack Création de Contenu Premium</h3>
                  <p className="text-xl text-gray-300 mb-6">Une expérience complète pour sublimer votre histoire</p>
                  <div className="inline-flex items-baseline gap-2 bg-white/5 px-8 py-4 rounded-full">
                    <span className="text-5xl font-bold bg-gradient-to-r from-accent-blue to-accent-turquoise bg-clip-text text-transparent">
                      4 899€
                    </span>
                    <span className="text-lg text-gray-400">pack complet</span>
                  </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                  {/* Features Column */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <CheckCircle className="text-accent-blue" size={24} />
                      <h4 className="text-xl font-bold">Ce qui est inclus</h4>
                    </div>
                    <ul className="space-y-6">
                      <li className="flex items-start gap-4 group/item">
                        <Video size={24} className="text-accent-blue flex-shrink-0 mt-1 group-hover/item:scale-110 transition-transform" />
                        <div>
                          <span className="block font-semibold mb-1">Tournage Premium</span>
                          <span className="text-sm text-gray-400">Session de tournage professionnelle avec Roger en studio haute qualité</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-4 group/item">
                        <Camera size={24} className="text-accent-blue flex-shrink-0 mt-1 group-hover/item:scale-110 transition-transform" />
                        <div>
                          <span className="block font-semibold mb-1">Pack Social Media</span>
                          <span className="text-sm text-gray-400">10 contenus courts optimisés pour Instagram, TikTok, YouTube Shorts et LinkedIn</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-4 group/item">
                        <Video size={24} className="text-accent-blue flex-shrink-0 mt-1 group-hover/item:scale-110 transition-transform" />
                        <div>
                          <span className="block font-semibold mb-1">Format Long Premium</span>
                          <span className="text-sm text-gray-400">Contenu long format exclusif hébergé sur YouTube et Spotify</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-4 group/item">
                        <Mic size={24} className="text-accent-blue flex-shrink-0 mt-1 group-hover/item:scale-110 transition-transform" />
                        <div>
                          <span className="block font-semibold mb-1">Distribution Podcast</span>
                          <span className="text-sm text-gray-400">Format audio optimisé et distribué sur toutes les plateformes majeures</span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Benefits Column */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <Award className="text-accent-blue" size={24} />
                      <h4 className="text-xl font-bold">Avantages Premium</h4>
                    </div>
                    <ul className="space-y-6">
                      <li className="flex items-start gap-4 group/item">
                        <BookOpen size={24} className="text-accent-blue flex-shrink-0 mt-1 group-hover/item:scale-110 transition-transform" />
                        <div>
                          <span className="block font-semibold mb-1">Articles SEO Optimisés</span>
                          <span className="text-sm text-gray-400">3 articles stratégiques optimisés pour maximiser votre visibilité</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-4 group/item">
                        <Users size={24} className="text-accent-blue flex-shrink-0 mt-1 group-hover/item:scale-110 transition-transform" />
                        <div>
                          <span className="block font-semibold mb-1">Coaching Personnalisé</span>
                          <span className="text-sm text-gray-400">2 sessions de coaching pour optimiser votre présence médiatique</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-4 group/item">
                        <CheckCircle size={24} className="text-accent-blue flex-shrink-0 mt-1 group-hover/item:scale-110 transition-transform" />
                        <div>
                          <span className="block font-semibold mb-1">Droits Complets</span>
                          <span className="text-sm text-gray-400">Propriété totale des contenus pour une utilisation illimitée</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-4 group/item">
                        <Star size={24} className="text-accent-blue flex-shrink-0 mt-1 group-hover/item:scale-110 transition-transform" />
                        <div>
                          <span className="block font-semibold mb-1">Support Privilégié</span>
                          <span className="text-sm text-gray-400">Accompagnement personnalisé tout au long du processus</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="text-center">
                  <Button 
                    variant="primary" 
                    size="lg"
                    href="#booking"
                    icon={<ArrowRight size={24} />}
                    className="px-12 py-6 text-xl"
                  >
                    Réserver votre session
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="container relative">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <span className="inline-block px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/10">
              Résultats
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              L'impact de votre histoire
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Des résultats concrets et mesurables pour votre marque, votre influence et votre business.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                icon: <Users size={24} className="text-white" />,
                value: "150+",
                label: "Entrepreneurs accompagnés",
                description: "De tous horizons et secteurs",
                gradient: "from-blue-600 to-cyan-400"
              },
              {
                icon: <Zap size={24} className="text-white" />,
                value: "10M+",
                label: "Vues générées",
                description: "Sur l'ensemble des plateformes",
                gradient: "from-purple-600 to-pink-500"
              },
              {
                icon: <Award size={24} className="text-white" />,
                value: "92%",
                label: "Taux de satisfaction",
                description: "Sur les 12 derniers mois",
                gradient: "from-amber-500 to-orange-600"
              },
              {
                icon: <Star size={24} className="text-white" />,
                value: "85%",
                label: "Conversion moyenne",
                description: "Sur les appels à l'action",
                gradient: "from-emerald-500 to-teal-400"
              }
            ].map((metric, index) => (
              <motion.div
                key={index}
                className="group relative"
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:border-white/20 transition-all duration-300">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${metric.gradient} flex items-center justify-center mx-auto mb-6`}>
                    {metric.icon}
                  </div>
                  <h3 className={`text-3xl font-bold mb-2 bg-gradient-to-r ${metric.gradient} bg-clip-text text-transparent`}>
                    {metric.value}
                  </h3>
                  <p className="font-medium mb-2">{metric.label}</p>
                  <p className="text-sm text-gray-400">{metric.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Success Stories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "De 0 à 10K abonnés en 3 mois",
                description: "Grâce à notre stratégie de contenu, Marie a développé une audience engagée et qualifiée sur LinkedIn.",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
                gradient: "from-blue-600 to-cyan-400"
              },
              {
                title: "Levée de fonds de 2.5M€",
                description: "Le pitch vidéo que nous avons créé a convaincu les investisseurs et permis à Thomas de lever les fonds nécessaires.",
                image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop",
                gradient: "from-purple-600 to-pink-500"
              },
              {
                title: "Livre best-seller",
                description: "Notre accompagnement éditorial a permis à Sophie de transformer son expertise en livre vendu à plus de 15 000 exemplaires.",
                image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop",
                gradient: "from-amber-500 to-orange-600"
              }
            ].map((story, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-2xl"
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${story.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Star size={16} className="text-accent-blue" />
                    <span className="text-sm font-medium text-accent-blue">Success Story</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                  <p className="text-gray-300">{story.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-20 bg-gradient-to-b from-black to-neutral-900 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)]" />
        
        <div className="container relative">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <span className="inline-block px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/10">
              Réservation
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Commencez votre histoire maintenant
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Réservez un appel de découverte gratuit pour discuter de votre projet et voir comment nous pouvons vous aider à créer du contenu qui vous ressemble.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              className="group relative"
              {...fadeInUp}
            >
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 hover:border-white/20 transition-all duration-300">
                {/* Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-white/5 rounded-xl p-6">
                    <Clock size={24} className="text-accent-blue mb-4" />
                    <h3 className="text-lg font-semibold mb-2">30 minutes</h3>
                    <p className="text-sm text-gray-400">
                      Un échange focalisé sur vos objectifs et besoins spécifiques
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6">
                    <Users size={24} className="text-accent-blue mb-4" />
                    <h3 className="text-lg font-semibold mb-2">One-on-One</h3>
                    <p className="text-sm text-gray-400">
                      Un appel personnalisé avec Roger pour discuter de votre projet
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6">
                    <ArrowRight size={24} className="text-accent-blue mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Next Steps</h3>
                    <p className="text-sm text-gray-400">
                      Un plan d'action clair pour la suite de votre projet
                    </p>
                  </div>
                </div>

                {/* Calendly Embed Placeholder */}
                <div className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-8 mb-8 text-center">
                  <h3 className="text-xl font-bold mb-4">Calendrier de réservation</h3>
                  <p className="text-gray-400 mb-8">Sélectionnez une date et un horaire qui vous conviennent pour votre appel de découverte gratuit.</p>
                  
                  {/* This would be replaced with an actual Calendly embed in production */}
                  <div className="h-[400px] bg-neutral-800 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Calendar size={48} className="text-accent-blue mx-auto mb-4" />
                      <p className="text-gray-300 mb-4">Calendrier de réservation</p>
                      <Button 
                        variant="primary" 
                        size="md"
                        href="https://calendly.com"
                        target="_blank"
                      >
                        Ouvrir le calendrier
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Testimonial */}
                <blockquote className="text-xl font-playfair italic text-center">
                  "L'appel découverte avec Roger m'a permis de clarifier ma vision et de définir une stratégie de contenu adaptée à mes objectifs."
                  <footer className="text-sm text-gray-400 mt-2">
                    — Marie Durant, CEO
                  </footer>
                </blockquote>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-neutral-900">
        <div className="container">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <span className="inline-block px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/10">
              Questions fréquentes
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tout ce que vous devez savoir
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "Comment se déroule une journée de tournage ?",
                answer: "La journée commence par une préparation (maquillage, coiffure si nécessaire) et un briefing. Nous procédons ensuite au tournage des différents formats prévus, avec des pauses régulières. La journée se termine par un débriefing et la planification des prochaines étapes."
              },
              {
                question: "Qui détient les droits sur les contenus créés ?",
                answer: "Vous détenez 100% des droits sur tous les contenus créés. Vous êtes libre de les utiliser comme bon vous semble, sur toutes les plateformes et pour une durée illimitée. Nous pouvons toutefois demander votre autorisation pour utiliser certains extraits à des fins promotionnelles."
              },
              {
                question: "Combien de contenus sont produits lors d'une session ?",
                answer: "Une session standard permet de produire environ 10-15 contenus courts (réels, shorts, posts LinkedIn) et 1-2 contenus longs (podcast, interview approfondie). Le nombre exact dépend de la formule choisie et de vos besoins spécifiques."
              },
              {
                question: "Quel est le délai de livraison des contenus ?",
                answer: "Les premiers contenus sont livrés dans les 72h suivant le tournage. L'ensemble des contenus est généralement livré dans un délai de 7 à 10 jours ouvrés, selon la quantité et la complexité des formats."
              },
              {
                question: "Faut-il préparer quelque chose avant la session ?",
                answer: "Oui, nous vous envoyons un questionnaire préparatoire et organisons un appel de briefing pour définir les thèmes, angles et messages clés. Nous vous guidons à chaque étape pour que vous soyez parfaitement préparé le jour J."
              }
            ].map((faq, index) => (
              <motion.details
                key={index}
                className="group mb-4 last:mb-0 bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <div className="w-6 h-6 flex-shrink-0 relative">
                    <div className="absolute top-1/2 left-0 w-6 h-0.5 bg-accent-blue transform -translate-y-1/2 group-open:rotate-45 transition-transform duration-300"></div>
                    <div className="absolute top-1/2 left-0 w-6 h-0.5 bg-accent-blue transform -translate-y-1/2 rotate-90 group-open:rotate-135 transition-transform duration-300"></div>
                  </div>
                </summary>
                <div className="px-6 pb-6 text-gray-300">
                  <p>{faq.answer}</p>
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.2),transparent_70%)]" />
        
        <div className="container relative">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="group relative"
              {...fadeInUp}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-blue via-accent-turquoise to-accent-blue rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-all duration-500 animate-tilt"></div>
              
              <div className="relative bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Prêt à raconter votre histoire ?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Réservez votre session maintenant et transformez votre expertise en contenu qui inspire, engage et convertit.
                </p>
                <Button 
                  variant="primary" 
                  size="lg"
                  href="#booking"
                  icon={<Calendar size={24} />}
                  className="px-12 py-6 text-xl"
                >
                  Réserver ma session
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-b from-black to-neutral-900">
        <div className="container">
          <NewsletterForm />
        </div>
      </section>
    </>
  );
};

export default CreateWithRogerPage;