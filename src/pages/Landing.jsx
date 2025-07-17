import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const [headline, setHeadline] = useState('');
  const fullHeadline = 'Unleash Your Ideas with Ink-It';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setHeadline(fullHeadline.slice(0, index + 1));
      index++;
      if (index === fullHeadline.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white scroll-smooth">
      {/* Header with Scroll Nav */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 bg-gray-800/90 backdrop-blur-sm shadow-md z-20">
        <h1 className="text-3xl font-extrabold text-purple-400">Ink-It</h1>
        <nav className="flex gap-6">
          <a href="#home" className="text-gray-300 hover:text-white transition">Home</a>
          <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
          <a href="#testimonials" className="text-gray-300 hover:text-white transition">Testimonials</a>
          <a href="#contact" className="text-gray-300 hover:text-white transition">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative flex flex-col justify-center items-center h-screen bg-gradient-to-r from-purple-700 via-pink-600 to-blue-500 pt-16"
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-center relative z-10">
          {headline}
        </h1>
        <p className="text-xl mt-4 max-w-xl text-center relative z-10">
          Capture your thoughts with vibrant creativity and structured focus.
        </p>
        <Link
          to="/home"
          className="mt-8 bg-purple-600 text-white px-10 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition relative z-10"
        >
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 bg-gray-800">
        <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { title: 'Organize Notes', desc: 'Structure your thoughts effortlessly with folders, tags, and priorities.' },
            { title: 'Sync Ideas', desc: 'Access and edit your notes seamlessly across all your devices.' },
            { title: 'Custom Themes', desc: 'Personalize your workspace with vibrant, elegant themes.' },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gray-700 p-8 rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
            >
              <h3 className="text-2xl font-semibold mb-4 text-purple-400">{feature.title}</h3>
              <p className="text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 px-6 bg-gray-900">
        <h2 className="text-4xl font-bold text-center mb-12">Testimonials</h2>
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gray-800 p-8 rounded-lg shadow-md">
            <p className="text-lg italic">“Ink-It transformed the way I capture, refine, and share my ideas. It’s an indispensable tool for my workflow!”</p>
            <p className="mt-4 text-gray-400">— Sarah, Product Designer</p>
          </div>
          {/* Extend with real carousel logic later */}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-6 bg-gray-800">
        <h2 className="text-4xl font-bold text-center mb-8">Get in Touch</h2>
        <p className="text-center max-w-xl mx-auto mb-6 text-gray-300">
          Have questions, suggestions, or feedback? Reach out to us anytime. We’d love to hear from you.
        </p>
        <div className="flex justify-center">
          <a
            href="mailto:support@inkit.com"
            className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition"
          >
            Contact Support
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-900 border-t border-purple-700">
        <p className="text-center text-gray-400">© {new Date().getFullYear()} Ink-It. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="#" className="text-gray-400 hover:text-purple-400 transition">Twitter</a>
          <a href="#" className="text-gray-400 hover:text-purple-400 transition">GitHub</a>
          <a href="#contact" className="text-gray-400 hover:text-purple-400 transition">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
