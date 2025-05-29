import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ResponsiveNavbar } from './components/layout/ResponsiveNavbar';
import Footer from './components/layout/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Analytics } from './components/common/Analytics';
import { ChatWidget } from './components/chat/ChatWidget';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ArticlePage } from './pages/ArticlePage';
import { CoachingPage } from './pages/CoachingPage';
import { AboutPage } from './pages/AboutPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { NotFound } from './pages/NotFound';

export const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">
            <ResponsiveNavbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/rubrique/:slug" element={<CategoryPage />} />
                <Route path="/article/:slug" element={<ArticlePage />} />
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
