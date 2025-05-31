import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Briefcase, Brain, Users } from 'lucide-react';

export default function EditorialSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {[
        {
          title: "Story",
          icon: BookOpen,
          tag: "Story",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80",
          excerpt: "Des parcours inspirants qui redéfinissent le possible",
          link: "/rubrique/story",
          gradient: "from-amber-500 to-orange-500",
          overlayGradient: "from-amber-900/80 via-black/50 to-transparent"
        },
        {
          title: "Business & innovation",
          icon: Briefcase,
          tag: "Innovation",
          image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
          excerpt: "Les nouvelles frontières de l'entrepreneuriat",
          link: "/rubrique/business",
          gradient: "from-blue-500 to-cyan-500",
          overlayGradient: "from-blue-900/80 via-black/50 to-transparent"
        },
        {
          title: "Mental",
          icon: Brain,
          tag: "Psychologie",
          image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
          excerpt: "Développer une psychologie de champion",
          link: "/rubrique/mental",
          gradient: "from-purple-500 to-violet-500",
          overlayGradient: "from-purple-900/80 via-black/50 to-transparent"
        },
        {
          title: "Society",
          icon: Users,
          tag: "Society",
          image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80",
          excerpt: "Décrypter les mutations de notre époque",
          link: "/rubrique/society",
          gradient: "from-emerald-500 to-teal-500",
          overlayGradient: "from-emerald-900/80 via-black/50 to-transparent"
        }
      ].map((category, index) => {
        const Icon = category.icon;
        return (
          <Link 
            key={index}
            to={category.link}
            className="relative overflow-hidden rounded-lg group h-64"
          >
            <div className="absolute inset-0">
              <img 
                src={category.image} 
                alt={category.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${category.overlayGradient}`} />
            </div>
            <div className="relative h-full flex flex-col justify-end p-6 text-white">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm bg-gradient-to-r ${category.gradient} mb-3 w-fit`}>
                <Icon className="w-4 h-4 mr-2" />
                {category.tag}
              </div>
              <h3 className="text-xl font-bold mb-2">{category.title}</h3>
              <p className="text-sm text-white/80">{category.excerpt}</p>
            </div>
          </Link>
        );
      })}
    </section>
  );
}