
import React from 'react';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white pt-16">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-28">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Hi, I'm <span className="text-portfolio-primary">Chirag Hariprasad</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 mb-6">
            AI & Machine Learning Engineer
          </h2>
          <p className="text-lg max-w-3xl mx-auto mb-8 text-gray-700">
            Based in Bengaluru, Karnataka. Specialized in artificial intelligence, 
            machine learning, and developing innovative technical solutions.
          </p>
          
          <div className="flex justify-center space-x-6 mb-10">
            <a 
              href="https://linkedin.com/in/chirag-hariprasad" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="https://github.com/ChiragHariprasad" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon"
            >
              <Github size={24} />
            </a>
            <a 
              href="mailto:chiragh.0804@gmail.com"
              className="social-icon"
            >
              <Mail size={24} />
            </a>
            <a 
              href="tel:+919036998027"
              className="social-icon"
            >
              <Phone size={24} />
            </a>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#about" className="button-primary">
              Learn More
            </a>
            <a href="#contact" className="border border-portfolio-primary text-portfolio-primary px-6 py-2 rounded-md hover:bg-portfolio-primary hover:text-white transition-colors duration-300">
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
