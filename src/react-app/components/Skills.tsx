
import React from 'react';

const Skills: React.FC = () => {
  const technicalSkills = [
    {
      category: "Programming Languages",
      skills: ["Python", "C", "R"]
    },
    {
      category: "Machine Learning",
      skills: ["Classification algorithms", "Neural Networks", "Computer Vision basics"]
    },
    {
      category: "Data Analysis",
      skills: ["Statistical analysis", "Data visualization", "Pattern recognition"]
    },
    {
      category: "Tools & Technologies",
      skills: ["Arduino", "PyGame", "Git", "CATIA", "Blender"]
    },
    {
      category: "3D Modeling & Manufacturing",
      skills: ["3D printing (FDM and LAM)", "Design optimization"]
    },
    {
      category: "Security",
      skills: ["Cryptography fundamentals", "Secure programming practices"]
    }
  ];

  const softSkills = [
    {
      skill: "Team Leadership",
      description: "Led project teams of 4-6 members, coordinating tasks and ensuring deliverables"
    },
    {
      skill: "Problem-Solving",
      description: "Applied analytical thinking to resolve complex technical challenges"
    },
    {
      skill: "Communication",
      description: "Effectively presented technical concepts to diverse audiences"
    },
    {
      skill: "Time Management",
      description: "Consistently met project deadlines while maintaining quality standards"
    },
    {
      skill: "Adaptability",
      description: "Quickly acquired new technical skills as required by project demands"
    }
  ];

  return (
    <section id="skills" className="section-container">
      <h2 className="section-title">Skills</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Technical Skills */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-portfolio-primary">Technical Skills</h3>
          <div className="space-y-6">
            {technicalSkills.map((skillSet, index) => (
              <div key={index} className="card">
                <h4 className="font-semibold text-lg mb-2">{skillSet.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skillSet.skills.map((skill, i) => (
                    <span 
                      key={i} 
                      className="bg-portfolio-primary bg-opacity-10 text-portfolio-primary px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Soft Skills */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-portfolio-primary">Leadership & Soft Skills</h3>
          <div className="space-y-4">
            {softSkills.map((skill, index) => (
              <div key={index} className="card">
                <h4 className="font-semibold text-lg">{skill.skill}</h4>
                <p className="text-gray-700">{skill.description}</p>
              </div>
            ))}
          </div>
          
          {/* Certifications */}
          <h3 className="text-2xl font-bold mb-6 mt-12 text-portfolio-primary">Certifications</h3>
          <div className="card">
            <ul className="list-disc pl-5 space-y-3 text-gray-700">
              <li>Goldman Sachs Software Engineering Virtual Experience Program — Forage, October 2024</li>
              <li>AWS APAC Solutions Architecture Virtual Experience Program — Forage, October 2024</li>
              <li>Data Science for Engineers — NPTEL, 8-week intensive course (75% score)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
