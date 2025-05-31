import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Briefcase, Brain, Users } from 'lucide-react';

export default function EditorialSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {[
        {
          title: "Story",
          subtitle: "Pour t'inspirer",
          description: "Des histoires authentiques qui redéfinissent le possible",
          icon: BookOpen,
          tag: "Story",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80",
          link: "/rubrique/story",
          gradient: "from-amber-500 to-orange-500",
          overlayGradient: "from-amber-900/80 via-black/50 to-transparent"
        },
        {
          title: "Business",
          subtitle: "Pour faire du chiffre",
          description: "Les stratégies qui font la différence",
          icon: Briefcase,
          tag: "Business",
          image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
          link: "/rubrique/business",
          gradient: "from-blue-500 to-cyan-500",
          overlayGradient: "from-blue-900/80 via-black/50 to-transparent"
        },
        {
          title: "Mental",
          subtitle: "Pour ta tête",
          description: "Développe une psychologie de champion",
          icon: Brain,
          tag: "Mental",
          image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
          link: "/rubrique/mental",
          gradient: "from-purple-500 to-violet-500",
          overlayGradient: "from-purple-900/80 via-black/50 to-transparent"
        },
        {
          title: "Society",
          subtitle: "Pour ta culture",
          description: "Comprendre les mutations de notre époque",
          icon: Users,
          tag: "Society",
          image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80",
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
            className="relative overflow-hidden rounded-lg group h-[320px]"
          >
            <div className="absolute inset-0">
              <img 
                src={category.image} 
                alt={category.title}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${category.overlayGradient}`} />
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
            </div>
            <div className="relative h-full flex flex-col justify-between p-6 text-white">
              <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-gradient-to-r ${category.gradient} self-start`}>
                <Icon className="w-4 h-4 mr-2" />
                {category.tag}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all duration-500">
                  {category.subtitle}
                </h3>
                <p className="text-sm text-white/80 group-hover:text-white transition-colors">
                  {category.description}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </section>
  );
}

export { EditorialSection }