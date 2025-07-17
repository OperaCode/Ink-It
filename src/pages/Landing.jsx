import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Landing = () => {
  const [headline, setHeadline] = useState("");
  const fullHeadline = "Unleash Your Ideas with Ink-It";

  // Hero text -ypingSpeed-100ms, pauseInterval -2000ms
  useEffect(() => {
    let index = 0;
    let interval;

    const startAnimation = () => {
      interval = setInterval(() => {
        setHeadline(fullHeadline.slice(0, index + 1));
        index++;
        if (index === fullHeadline.length) {
          clearInterval(interval);
          setTimeout(() => {
            index = 0;
            setHeadline("");
            startAnimation();
          }, 2000);
        }
      }, 100);
    };

    startAnimation();

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white scroll-smooth">
      {/* Header with Scroll Nav */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 bg-gray-800/90 backdrop-blur-sm shadow-md z-20">
        <h1 className="text-3xl font-extrabold text-purple-400">Ink-It</h1>
        <nav className="flex gap-6">
          <a href="#home" className="text-gray-300 hover:text-white transition">
            Home
          </a>
          <a
            href="#features"
            className="text-gray-300 hover:text-white transition"
          >
            Features
          </a>
          {/* <a
            href="#testimonials"
            className="text-gray-300 hover:text-white transition"
          >
            Testimonials
          </a> */}
          <a
            href="#contact"
            className="text-gray-300 hover:text-white transition"
          >
            Contact
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <motion.section
        id="home"
        className="relative flex flex-col justify-center items-center h-screen bg-gradient-to-r from-purple-600 via-pink-800 to-blue-800 pt-16"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-center relative z-10">
          {headline}
        </h1>
        <p className="text-xl mt-4 max-w-xl text-center relative z-10">
          Capture your thoughts with vibrant creativity and structured focus.
        </p>
        <motion.a
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          href="/home"
          className="mt-8 bg-purple-600 text-white px-10 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition relative z-10"
        >
          Get Started
        </motion.a>
      </motion.section>

      {/* Features Section */}
      <motion.section
       initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.2 }}
    transition={{ duration: 0.6, delay: 0.2 }}
        id="features"
        className="py-16 px-6 bg-gray-800"
      >
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Organize Notes",
              desc: "Structure your thoughts effortlessly with folders, tags, and priorities.",
            },
            {
              title: "Sync Ideas",
              desc: "Access and edit your notes seamlessly across all your devices.",
            },
            {
              title: "Custom Themes",
              desc: "Personalize your workspace with vibrant, elegant themes.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gray-700 p-8 rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
            >
              <h3 className="text-2xl font-semibold mb-4 text-purple-400">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        id="testimonials"
        className="py-16 px-6 bg-gray-900"
      >
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Testimonials
        </motion.h2>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 p-8 rounded-lg shadow-md"
          >
            <p className="text-lg italic">
              “Ink-It transformed the way I capture, refine, and share my ideas.
              It’s an indispensable tool for my workflow!”
            </p>
            <p className="mt-4 text-gray-400">— Sarah, Product Designer</p>
          </motion.div>
          {/* Extend with real carousel logic later */}
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        id="contact"
        className="py-16 px-6 bg-gray-800"
      >
        <h2 className="text-4xl font-bold text-center mb-8">Get in Touch</h2>
        <p className="text-center max-w-xl mx-auto mb-6 text-gray-300">
          Have questions, suggestions, or feedback? Reach out to us anytime.
          We’d love to hear from you.
        </p>
        <div className="flex justify-center">
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            href="mailto:support@inkit.com"
            className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition"
          >
            Contact Support
          </motion.a>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-900 border-t border-purple-700">
        <p className="text-center text-gray-400">
          © {new Date().getFullYear()} Ink-It. All rights reserved.
        </p>
        <div className="flex justify-center gap-6 mt-4">
          <a
            href="#"
            className="text-gray-400 hover:text-purple-400 transition"
          >
            Twitter
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-purple-400 transition"
          >
            GitHub
          </a>
          <a
            href="#contact"
            className="text-gray-400 hover:text-purple-400 transition"
          >
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
