import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ResponsiveNavbar } from './components/layout/ResponsiveNavbar';
import { Footer } from './components/layout/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Analytics } from './components/common/Analytics';
import { ChatWidget } from './components/chat/ChatWidget';
import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';
import { CategoryPage } from './pages/CategoryPage';
import { PodcastPage } from './pages/PodcastPage';
import { EmissionsPage } from './pages/EmissionsPage';
import { CreateWithRogerPage } from './pages/CreateWithRogerPage';
import { AboutPage } from './pages/AboutPage';
import { AllArticlesPage } from './pages/AllArticlesPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { CoachingPage } from './pages/CoachingPage';
import { BusinessIdeasPage } from './pages/BusinessIdeasPage';
import { BusinessIdeaPage } from './pages/BusinessIdeaPage';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="relative min-h-screen">
          {/* Background Effects */}
          <div className="app-background">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(56,189,248,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(6,182,212,0.15),transparent_50%)]" />
            <div className="absolute inset-0 backdrop-blur-[100px]" />
          </div>

          {/* Content */}
          <div className="relative">
            <ResponsiveNavbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/articles" element={<AllArticlesPage />} />
                <Route path="/article/:slug" element={<ArticlePage />} />
                <Route path="/business-ideas" element={<BusinessIdeasPage />} />
                <Route path="/business-idea/:slug" element={<BusinessIdeaPage />} />
                
                {/* Redirections pour les anciennes routes vers les nouvelles */}
                <Route path="/rubrique/recits" element={<Navigate to="/rubrique/story\" replace />} />
                <Route path="/rubrique/psychologie" element={<Navigate to="/rubrique/mental\" replace />} />
                <Route path="/rubrique/culture" element={<Navigate to="/rubrique/society\" replace />} />
                
                {/* Routes des catégories */}
                <Route path="/rubrique/:categorySlug" element={<CategoryPage />} />
                
                <Route path="/podcasts" element={<PodcastPage />} />
                <Route path="/emissions" element={<EmissionsPage />} />
                <Route path="/create-with-roger" element={<CreateWithRogerPage />} />
                <Route path="/co-shooting" element={<Navigate to="/create-with-roger\" replace />} />
                <Route path="/coaching" element={<CoachingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/recommendations" element={<RecommendationsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <Analytics />
            <ChatWidget />
          </div>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;