
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <a href="#" className="text-xl md:text-2xl font-bold text-portfolio-primary">
          CHIRAG H
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="#about" className="hover:text-portfolio-primary transition-colors">About</a>
          <a href="#experience" className="hover:text-portfolio-primary transition-colors">Experience</a>
          <a href="#education" className="hover:text-portfolio-primary transition-colors">Education</a>
          <a href="#projects" className="hover:text-portfolio-primary transition-colors">Projects</a>
          <a href="#skills" className="hover:text-portfolio-primary transition-colors">Skills</a>
          <a href="#contact" className="hover:text-portfolio-primary transition-colors">Contact</a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-800"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white py-4 px-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            <a 
              href="#about" 
              className="hover:text-portfolio-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#experience" 
              className="hover:text-portfolio-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Experience
            </a>
            <a 
              href="#education" 
              className="hover:text-portfolio-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Education
            </a>
            <a 
              href="#projects" 
              className="hover:text-portfolio-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects
            </a>
            <a 
              href="#skills" 
              className="hover:text-portfolio-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Skills
            </a>
            <a 
              href="#contact" 
              className="hover:text-portfolio-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
