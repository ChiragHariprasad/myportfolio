
import React from 'react';
import { Book } from 'lucide-react';

const Education: React.FC = () => {
  return (
    <section id="education" className="section-container">
      <h2 className="section-title">Education</h2>
      
      <div className="relative">
        {/* Timeline */}
        <div className="absolute left-5 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-portfolio-primary"></div>

        <div className="space-y-12">
          {/* RV College */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:text-right md:pr-12">
              <div className="hidden md:block absolute right-0 top-5 transform translate-x-1/2 bg-white p-2 rounded-full border-2 border-portfolio-primary">
                <Book size={20} className="text-portfolio-primary" />
              </div>
              <div className="md:hidden absolute left-0 top-0 transform -translate-x-1/2 bg-white p-2 rounded-full border-2 border-portfolio-primary">
                <Book size={20} className="text-portfolio-primary" />
              </div>

              <h3 className="text-xl font-bold">RV College of Engineering</h3>
              <p className="text-portfolio-primary font-medium">Bachelor of Engineering (B.E.)</p>
              <p className="text-gray-600">Artificial Intelligence and Machine Learning</p>
              <p className="text-gray-600">2024 – Present</p>
            </div>

            <div className="card md:ml-12">
              <p className="mb-2"><span className="font-medium">CGPA:</span> 7.5/10.0</p>
              <p className="text-gray-700">Lateral Entry Program</p>
              <p className="text-gray-700 mt-2">Focusing on advanced AI/ML concepts, algorithms, and applications in real-world scenarios.</p>
            </div>
          </div>

          {/* Sri Jayachamarajendra Polytechnic */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:text-right md:pr-12">
              <div className="hidden md:block absolute right-0 top-5 transform translate-x-1/2 bg-white p-2 rounded-full border-2 border-portfolio-primary">
                <Book size={20} className="text-portfolio-primary" />
              </div>
              <div className="md:hidden absolute left-0 top-0 transform -translate-x-1/2 bg-white p-2 rounded-full border-2 border-portfolio-primary">
                <Book size={20} className="text-portfolio-primary" />
              </div>

              <h3 className="text-xl font-bold">Sri Jayachamarajendra Polytechnic</h3>
              <p className="text-portfolio-primary font-medium">Diploma in Mechatronics Engineering</p>
              <p className="text-gray-600">2021 – 2024</p>
            </div>

            <div className="card md:ml-12">
              <p className="mb-2"><span className="font-medium">CGPA:</span> 9.64/10.0</p>
              <p className="text-gray-700">Studied the integration of mechanical engineering, electronics, computer systems, and control engineering.</p>
              <p className="text-gray-700 mt-2">Developed strong foundation in automation systems and robotic applications.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
