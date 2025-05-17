
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="section-container">
      <h2 className="section-title">About Me</h2>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-7">
          <p className="text-lg text-gray-700 mb-6">
            Results-driven Artificial Intelligence and Machine Learning engineering student with demonstrated experience in Python programming, 
            data analysis, and machine learning algorithms. I combine technical expertise in AI/ML with 3+ years of leadership experience and 
            project management skills.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            I have a proven ability to develop innovative solutions including computer vision applications and automated systems. 
            Currently seeking to leverage my technical and leadership capabilities in a challenging role.
          </p>
          <p className="text-lg text-gray-700">
            My areas of expertise include Machine Learning algorithms, Computer Vision, Data Analysis, 
            and 3D Modeling & Manufacturing technologies.
          </p>
        </div>
        
        <div className="md:col-span-5">
          <div className="card h-full flex flex-col justify-center">
            <h3 className="text-xl font-semibold mb-4 text-portfolio-primary">Personal Details</h3>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <span className="font-medium min-w-[100px]">Name:</span>
                <span>Chirag Hariprasad</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-[100px]">Location:</span>
                <span>Bengaluru, Karnataka, India</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-[100px]">Email:</span>
                <a href="mailto:chiragh.0804@gmail.com" className="text-portfolio-primary hover:underline">
                  chiragh.0804@gmail.com
                </a>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-[100px]">Phone:</span>
                <a href="tel:+919036998027" className="text-portfolio-primary hover:underline">
                  +91 90369 98027
                </a>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-[100px]">LinkedIn:</span>
                <a 
                  href="https://linkedin.com/in/chirag-hariprasad" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-portfolio-primary hover:underline"
                >
                  linkedin.com/in/chirag-hariprasad
                </a>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-[100px]">GitHub:</span>
                <a 
                  href="https://github.com/ChiragHariprasad" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-portfolio-primary hover:underline"
                >
                  github.com/ChiragHariprasad
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
