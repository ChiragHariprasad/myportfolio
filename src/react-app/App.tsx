import React from 'react';
import MatrixBackground from './components/MatrixBackground';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Leadership from './components/Leadership';
import Contact from './components/Contact';

function App() {
  return (
    <div className="terminal-container">
      <MatrixBackground />
      <Header />
      <About />
      <Projects />
      <Skills />
      <Leadership />
      <Contact />
    </div>
  );
}

export default App;