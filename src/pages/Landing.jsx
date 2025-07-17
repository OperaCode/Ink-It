import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Landing = () => {
  const [headline, setHeadline] = useState("");
  const fullHeadline = "Unleash Your Ideas with InkPulse";

  // HeroText Animation- pause-2000ms,typespeed-100ms
  useEffect(() => {
    let index = 0;
    let interval;

    // start the typing animation
    const startAnimation = () => {
      interval = setInterval(() => {
        // Update the headline state to include one more character
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
      }, 100); // Typing speed: 100ms 
    };

    startAnimation(); // Initiate the typing animation on mount

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white scroll-smooth font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-4 bg-gray-900/80 backdrop-blur-md shadow z-20">
        <h1 className="text-3xl font-bold text-cyan-400">InkPulse</h1>
        <nav className="flex gap-6 text-sm font-medium">
          <a
            href="#home"
            className="text-gray-300 hover:text-cyan-400 transition"
          >
            Home
          </a>
          <a
            href="#features"
            className="text-gray-300 hover:text-cyan-400 transition"
          >
            Features
          </a>
          <a
            href="#contact"
            className="text-gray-300 hover:text-cyan-400 transition"
          >
            Contact
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative flex flex-col justify-center items-center h-screen bg-gradient-to-br from-cyan-900 via-purple-900 to-gray-900 pt-20 text-center px-4"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold text-cyan-300 drop-shadow-md"
        >
          {headline}
        </motion.h1>
        <p className="text-lg md:text-xl mt-6 max-w-2xl text-gray-300">
          Capture and organize your ideas with clarity, focus, and elegance.
        </p>
        <motion.a
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          href="/home"
          className="mt-10 inline-block bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow transition"
        >
          Get Started
        </motion.a>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gray-900">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 text-cyan-400"
        >
          Features
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {[
            {
              title: "Organize Notes",
              desc: "Structure your thoughts seamlessly with folders, tags, and lock features.",
            },
            {
              title: "Secure Ideas",
              desc: "Lock confidential notes with PIN encryption for ultimate privacy.",
            },
            {
              title: "Custom Themes",
              desc: "Personalize your writing space with elegant themes and dark mode.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 p-8 rounded-xl shadow-lg border border-cyan-700/30"
            >
              <h3 className="text-2xl font-semibold mb-4 text-cyan-300">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        id="testimonials"
        className="py-20 px-6 bg-gradient-to-br from-gray-900 to-gray-800"
      >
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 text-cyan-400"
        >
          What Users Say
        </motion.h2>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 p-8 rounded-xl shadow-md border border-cyan-700/30"
          >
            <p className="text-lg italic text-gray-300">
              “InkPulse transformed the way I capture and refine my ideas. It's
              now my daily companion for structured thinking.”
            </p>
            <p className="mt-4 text-gray-400">— Sarah, Product Designer</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gray-900">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-8 text-cyan-400"
        >
          Get in Touch
        </motion.h2>
        <p className="text-center max-w-xl mx-auto mb-6 text-gray-400">
          Have suggestions or feedback? We’d love to hear from you anytime.
        </p>
        <div className="flex justify-center">
          <motion.a
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            href="mailto:support@inkpulse.com"
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow transition"
          >
            Contact Support
          </motion.a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-950 border-t border-cyan-800/50">
        <p className="text-center text-gray-400">
          © {new Date().getFullYear()} InkPulse. All rights reserved.
        </p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="#" className="text-gray-400 hover:text-cyan-400 transition">
            Twitter
          </a>
          <a href="#" className="text-gray-400 hover:text-cyan-400 transition">
            GitHub
          </a>
          <a
            href="#contact"
            className="text-gray-400 hover:text-cyan-400 transition"
          >
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
