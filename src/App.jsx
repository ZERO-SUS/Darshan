import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Intro from './components/Intro';
import GlassDock from './components/effects/GlassDock';
import CustomCursor from './components/effects/CustomCursor';
import SoundFx from './components/effects/SoundFx';
import TypingTitle from './components/effects/TypingTitle';
import { LiquidFilterDefs } from './components/effects/LiquidImage';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPostDetail from './pages/BlogPostDetail';
import AdminDashboard from './pages/AdminDashboard';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <HelmetProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <TypingTitle text="Darshan Designer" />
        <div className="flex min-h-screen flex-col bg-bg text-ink">
          <Intro />
          <CustomCursor />
          <SoundFx />
          <LiquidFilterDefs />
          <Header />
          <main className="flex-1 pt-24">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPostDetail />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <GlassDock />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
