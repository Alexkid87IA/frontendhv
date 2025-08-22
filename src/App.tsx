import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ResponsiveNavbar } from './components/layout/ResponsiveNavbar';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Analytics } from './components/common/Analytics';
import { ChatWidget } from './components/chat/ChatWidget';
import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';
import { CategoryPage } from './pages/CategoryPage';
import { SubcategoryPage } from './pages/SubcategoryPage';
import { PodcastPage } from './pages/PodcastPage';
import EmissionsPage from './pages/EmissionsPage';
import { EmissionPage } from './pages/EmissionPage';
import { CreateWithRogerPage } from './pages/CreateWithRogerPage';
import { AboutPage } from './pages/AboutPage';
import { AllArticlesPage } from './pages/AllArticlesPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { CoachingPage } from './pages/CoachingPage';
import { BusinessIdeasPage } from './pages/BusinessIdeasPage';
import { BusinessIdeaPage } from './pages/BusinessIdeaPage';
import { SuccessStoryPage } from './pages/SuccessStoryPage';
import { ClubPage } from './pages/ClubPage';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="relative min-h-screen bg-black">
          <ResponsiveNavbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/articles" element={<AllArticlesPage />} />
              <Route path="/article/:slug" element={<ArticlePage />} />
              <Route path="/business-ideas" element={<BusinessIdeasPage />} />
              <Route path="/business-idea/:slug" element={<BusinessIdeaPage />} />
              <Route path="/success-story/:slug" element={<SuccessStoryPage />} />
              <Route path="/emission/:slug" element={<EmissionPage />} />
              <Route path="/rubrique/:categorySlug" element={<CategoryPage />} />
              <Route path="/rubrique/:categorySlug/:subcategorySlug" element={<SubcategoryPage />} />
              <Route path="/podcasts" element={<PodcastPage />} />
              <Route path="/emissions" element={<EmissionsPage />} />
              <Route path="/club" element={<ClubPage />} />
              <Route path="/create-with-roger" element={<CreateWithRogerPage />} />
              <Route path="/coaching" element={<CoachingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/recommendations" element={<RecommendationsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Analytics />
          <ChatWidget />
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;