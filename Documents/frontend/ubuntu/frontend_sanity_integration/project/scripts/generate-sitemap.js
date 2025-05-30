import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { Readable } from 'stream';

const baseUrl = 'https://rogerormieres.fr';

// Liste des routes statiques
const routes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/articles', changefreq: 'daily', priority: 0.9 },
  { url: '/rubrique/recits', changefreq: 'weekly', priority: 0.8 },
  { url: '/rubrique/business', changefreq: 'weekly', priority: 0.8 },
  { url: '/rubrique/psychologie', changefreq: 'weekly', priority: 0.8 },
  { url: '/rubrique/culture', changefreq: 'weekly', priority: 0.8 },
  { url: '/podcasts', changefreq: 'weekly', priority: 0.8 },
  { url: '/emissions', changefreq: 'weekly', priority: 0.8 },
  { url: '/roger-said', changefreq: 'weekly', priority: 0.8 },
  { url: '/create-with-roger', changefreq: 'monthly', priority: 0.7 },
  { url: '/about', changefreq: 'monthly', priority: 0.6 }
];

async function generateSitemap() {
  const stream = new SitemapStream({ hostname: baseUrl });
  
  return streamToPromise(Readable.from(routes).pipe(stream)).then((data) =>
    data.toString()
  );
}

generateSitemap().then(sitemap => {
  createWriteStream('./public/sitemap.xml').write(sitemap);
  console.log('Sitemap generated successfully!');
});