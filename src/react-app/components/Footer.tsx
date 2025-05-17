
import React from 'react';
import { Linkedin, Github, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-portfolio-primary mb-4">CHIRAG H</h2>
            <p className="max-w-md text-gray-400">
              AI & Machine Learning Engineer based in Bengaluru, Karnataka,
              specialized in developing innovative technical solutions.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-4">
              <a href="#about" className="text-gray-400 hover:text-portfolio-primary transition-colors">About</a>
              <a href="#experience" className="text-gray-400 hover:text-portfolio-primary transition-colors">Experience</a>
              <a href="#education" className="text-gray-400 hover:text-portfolio-primary transition-colors">Education</a>
              <a href="#projects" className="text-gray-400 hover:text-portfolio-primary transition-colors">Projects</a>
              <a href="#skills" className="text-gray-400 hover:text-portfolio-primary transition-colors">Skills</a>
              <a href="#contact" className="text-gray-400 hover:text-portfolio-primary transition-colors">Contact</a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 mt-6 md:mt-0">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="https://linkedin.com/in/chirag-hariprasad" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-portfolio-primary transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://github.com/ChiragHariprasad" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-portfolio-primary transition-colors"
              >
                <Github size={20} />
              </a>
              <a 
                href="mailto:chiragh.0804@gmail.com"
                className="hover:text-portfolio-primary transition-colors"
              >
                <Mail size={20} />
              </a>
              <a 
                href="tel:+919036998027"
                className="hover:text-portfolio-primary transition-colors"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Chirag Hariprasad. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
