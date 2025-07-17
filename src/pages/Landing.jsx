import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Landing = () => {
  const [headline, setHeadline] = useState('');
  const fullHeadline = 'Unleash Your Ideas with InkPulse';

  useEffect(() => {
    // Letter-by-letter animation for headline
    let index = 0;
    const interval = setInterval(() => {
      setHeadline(fullHeadline.slice(0, index + 1));
      index++;
      if (index === fullHeadline.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Header with Nav Buttons */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-gray-800/80 backdrop-blur-sm shadow-md z-20">
        <h1 className="text-3xl font-extrabold text-purple-400">InkPulse</h1>
        <nav className="flex gap-4">
          {['Home', 'Features', 'About', 'Contact'].map((item, index) => (
            <Link
              key={index}
              to={`/${item.toLowerCase()}`}
              className="text-gray-300 px-3 py-2 rounded-lg hover:text-white hover:animate-nav-glow transition-all"
            >
              {item}
            </Link>
          ))}
        </nav>
      </header>

      {/* Hero Section with HeroGlow Animation */}
      <section className="relative flex flex-col justify-center items-center h-[80vh] bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 animate-gradient-shift pt-16">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-center relative z-10">
          {headline}
        </h1>
        <p className="text-xl mt-4 max-w-lg text-center relative z-10 animate-fade-in">
          Capture your thoughts with a vibrant, creative spark.
        </p>
        <Link
          to="/home"
          className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition-all animate-wave-cta relative z-10"
        >
          Launch InkPulse
        </Link>
      </section>

      {/* Feature Section with FeatureCard Pop */}
      <section className="py-12 px-4 bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-8">Why InkPulse?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { title: 'Organize Notes', desc: 'Structure your thoughts effortlessly.' },
            { title: 'Sync Ideas', desc: 'Access your notes anywhere, anytime.' },
            { title: 'Custom Themes', desc: 'Personalize with vibrant styles.' }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gray-700/50 p-6 rounded-lg backdrop-blur-sm hover:scale-105 transition-transform animate-pop-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Carousel */}
      <section className="py-12 px-4 bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-8">What Users Say</h2>
        <div className="max-w-2xl mx-auto">
          <div className="animate-slide-in">
            <p className="text-lg italic">“InkPulse makes note-taking a joy!”</p>
            <p className="text-sm text-gray-400 mt-2">— Sarah, Designer</p>
          </div>
          {/* Add more slides in a real carousel with state */}
        </div>
      </section>

      {/* Footer with InkSplash */}
      <footer className="py-8 px-4 bg-gray-800 text-center border-t-2 border-gradient-to-r from-purple-600 to-blue-500 animate-ink-splash">
        <p>© {new Date().getFullYear()} InkPulse. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-4">
          <a href="#" className="text-gray-400 hover:text-purple-400 hover:animate-nav-glow">Twitter</a>
          <a href="#" className="text-gray-400 hover:text-purple-400 hover:animate-nav-glow">GitHub</a>
          <a href="#" className="text-gray-400 hover:text-purple-400 hover:animate-nav-glow">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default Landing;