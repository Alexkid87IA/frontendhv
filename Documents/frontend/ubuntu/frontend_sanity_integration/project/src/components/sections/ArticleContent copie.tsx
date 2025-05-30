import React from 'react';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { urlFor } from '../../utils/sanityImage'; // Assurez-vous que ce chemin est correct
import { SanityImage } from '../../pages/ArticlePage'; // Type pour l'image Sanity

interface ArticleContentProps {
  content: any[]; // Le contenu Portable Text est un tableau d'objets
}

// Définition des composants personnalisés pour le rendu Portable Text
const customComponents: Partial<PortableTextComponents> = {
  types: {
    image: ({ value }: { value: SanityImage & { alt?: string } }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <figure className="my-8 md:my-10 transform transition-all duration-300 ease-out hover:scale-[1.02]">
          <img
            src={urlFor(value).fit('max').auto('format').url()}            alt={value.alt || "Image de l'article"}
            className="rounded-lg shadow-xl mx-auto max-h-[600px] object-contain"
            loading="lazy"
          />
          {value.alt && (
            <figcaption className="text-center text-sm text-gray-400 mt-3 italic">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
    block: (props) => {
      const { style = 'normal' } = props.value;

      if (style === 'h1') {
        return <h1 className="text-4xl sm:text-5xl font-bold my-8 md:my-10 text-white leading-tight">{props.children}</h1>;
      }
      if (style === 'h2') {
        return <h2 className="text-3xl sm:text-4xl font-bold mt-10 mb-5 md:mt-12 md:mb-6 text-white leading-snug">{props.children}</h2>;
      }
      if (style === 'h3') {
        return <h3 className="text-2xl sm:text-3xl font-bold mt-8 mb-4 md:mt-10 md:mb-5 text-white leading-normal">{props.children}</h3>;
      }
      if (style === 'h4') {
        return <h4 className="text-xl sm:text-2xl font-bold mt-6 mb-3 md:mt-8 md:mb-4 text-white leading-normal">{props.children}</h4>;
      }
      if (style === 'blockquote') {
        return (
          <blockquote className="relative border-l-4 border-accent-violet pl-6 pr-4 py-4 my-8 md:my-10 text-lg md:text-xl italic text-gray-200 bg-gray-800/30 rounded-r-md shadow-md">
            <span className="absolute top-2 left-2 text-4xl text-accent-violet/50 opacity-50">“</span>
            {props.children}
            <span className="absolute bottom-1 right-3 text-4xl text-accent-violet/50 opacity-50">”</span>
          </blockquote>
        );
      }
      // Paragraphe par défaut
      return <p className="text-base sm:text-lg md:text-xl leading-relaxed sm:leading-loose my-5 md:my-6 text-gray-300 font-light">{props.children}</p>;
    },
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a 
          href={value.href} 
          rel={rel} 
          className="text-accent-blue hover:text-accent-violet-light underline decoration-accent-blue/50 hover:decoration-accent-violet-light/70 underline-offset-2 transition-all duration-200 ease-in-out"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
    em: ({ children }) => <em className="italic text-gray-200">{children}</em>,
    code: ({ children }) => <code className="bg-gray-700/50 text-accent-orange-light px-1.5 py-0.5 rounded-md text-sm font-mono">{children}</code>,
    underline: ({ children }) => <span className="underline decoration-gray-500 underline-offset-2">{children}</span>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-outside my-5 md:my-6 pl-6 md:pl-8 space-y-2 text-gray-300">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-outside my-5 md:my-6 pl-6 md:pl-8 space-y-2 text-gray-300">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="text-base sm:text-lg md:text-xl leading-relaxed sm:leading-loose pl-2">{children}</li>,
    number: ({ children }) => <li className="text-base sm:text-lg md:text-xl leading-relaxed sm:leading-loose pl-2">{children}</li>,
  },
};

export const ArticleContent: React.FC<ArticleContentProps> = ({ content }) => {
  if (!content || content.length === 0) {
    return <p className="text-gray-400 text-center py-10">Le contenu de cet article n'est pas encore disponible.</p>;
  }

  return (
    // La classe `prose` de Tailwind est utile mais peut être surchargée par nos styles personnalisés.
    // Nous utilisons `prose-invert` pour le thème sombre de base.
    // `max-w-none` pour que nos conteneurs parents gèrent la largeur.
    <article className="prose prose-lg prose-invert max-w-none selection:bg-accent-violet selection:text-white">
      <PortableText
        value={content}
        components={customComponents}
      />
    </article>
  );
};

export default ArticleContent;

