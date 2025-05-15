// src/pages/AllArticlesPage.tsx
import React, { useEffect, useState } from 'react';
import { sanityClient } from '../lib/sanityClient'; // Ajustez le chemin si besoin
// ... autres imports

export const AllArticlesPage = () => {
  console.log("--- AllArticlesPage COMPOSANT EST MONTÉ ---"); // <--- AJOUTEZ CECI

  const [articles, setArticles] = useState<SanityArticle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // ... autres états

  useEffect(() => {
    console.log("--- AllArticlesPage useEffect DÉMARRE ---"); // <--- AJOUTEZ CECI

    const fetchArticles = async () => {
      console.log("--- AllArticlesPage fetchArticles DÉMARRE ---"); // <--- AJOUTEZ CECI
      setIsLoading(true);
      try {
        const query = `*[_type == "article"] | order(publishedAt desc) {
          "slug": slug.current,
          title,
          mainImage,
          "tag": category->title,
          "summary": excerpt,
          publishedAt
        }`;
        console.log("--- AllArticlesPage AVANT sanityClient.fetch ---"); // <--- AJOUTEZ CECI
        const sanityArticles: SanityArticle[] = await sanityClient.fetch(query);
        console.log("--- AllArticlesPage APRÈS sanityClient.fetch, articles reçus:", sanityArticles); // <--- AJOUTEZ CECI
        setArticles(sanityArticles);
      } catch (error) {
        console.error("--- AllArticlesPage ERREUR dans fetchArticles:", error); // <--- AJOUTEZ CECI
        setArticles([]);
      }
      setIsLoading(false);
      console.log("--- AllArticlesPage fetchArticles TERMINÉ ---"); // <--- AJOUTEZ CECI
    };

    fetchArticles();
  }, []);

  // ... reste du composant

  console.log("--- AllArticlesPage RENDU, articles actuels:", articles); // <--- AJOUTEZ CECI (juste avant le return)
  return (
    <>
      {/* ... */}
    </>
  );
};

export default AllArticlesPage;
