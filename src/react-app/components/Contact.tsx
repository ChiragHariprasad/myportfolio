import React, { useState, useEffect, useRef } from 'react';
import { Mail, Send } from 'lucide-react';
import '../styles/portfolio.css';

const Contact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="section-container">
      <div className={isVisible ? 'animate-fade-up' : ''} style={{ animationDelay: isVisible ? '0.1s' : '0s' }}>
        <div className="ivory-card contact-block hover-gold-card">
          <h2 className="contact-title text-serif">Let's Build the Future Together</h2>

          <p className="contact-desc">
            I am always looking to collaborate on complex system architectures, high-assurance AI pipelines,
            and new technology ventures. If you have an engineering challenge or research opportunity, let's connect.
          </p>

          <div className="contact-btn-container">
            <a
              href="mailto:chiragh.0804@gmail.com?subject=Let's%20build%20something%20amazing"
              className="btn-primary"
              style={{ textDecoration: 'none' }}
            >
              <Mail size={18} />
              Initialize Connection
            </a>
          </div>

          <div className="contact-info-footer">
            <div>Email: chiragh.0804@gmail.com</div>
            <div style={{ marginTop: '0.5rem', color: 'var(--gold-dark)' }}>
              System Response: Available for research collaborations and systems engineering consulting.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;