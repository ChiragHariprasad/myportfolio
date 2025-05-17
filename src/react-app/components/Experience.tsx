
import React from 'react';
import { Briefcase } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="section-container bg-gray-50">
      <h2 className="section-title">Professional Experience</h2>
      
      <div className="relative">
        {/* Timeline */}
        <div className="absolute left-5 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-portfolio-primary"></div>

        <div className="space-y-12">
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:text-right md:pr-12">
              <div className="hidden md:block absolute right-0 top-5 transform translate-x-1/2 bg-white p-2 rounded-full border-2 border-portfolio-primary">
                <Briefcase size={20} className="text-portfolio-primary" />
              </div>
              <div className="md:hidden absolute left-0 top-0 transform -translate-x-1/2 bg-white p-2 rounded-full border-2 border-portfolio-primary">
                <Briefcase size={20} className="text-portfolio-primary" />
              </div>

              <h3 className="text-xl font-bold">Quality Control Engineer Intern</h3>
              <p className="text-portfolio-primary font-medium">Globe Tech Fortune Industries Pvt. Ltd.</p>
              <p className="text-gray-600">January 2024 – April 2024</p>
            </div>

            <div className="card md:ml-12">
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Implemented quality assurance protocols that improved production efficiency by 15% through systematic testing and documentation</li>
                <li>Analyzed manufacturing data using statistical methods to identify process improvement opportunities</li>
                <li>Collaborated with cross-functional teams to optimize industrial workflows and reduce production errors</li>
                <li>Generated detailed technical reports and presented findings to management with actionable recommendations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
