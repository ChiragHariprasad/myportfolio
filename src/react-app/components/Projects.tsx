
import React from 'react';

const Projects: React.FC = () => {
  const projects = [
    {
      title: "Computer Vision-Based Gesture Recognition Home Automation System",
      year: "2024",
      description: [
        "Designed and implemented a Python-Arduino interface that converts hand gestures to control commands",
        "Utilized OpenCV and machine learning algorithms to achieve 92% gesture recognition accuracy",
        "Developed custom firmware for Arduino to process control signals and manage home appliances",
        "Created system specifically to assist verbally impaired users, enhancing accessibility"
      ],
      tags: ["Python", "OpenCV", "Arduino", "Machine Learning", "Accessibility"]
    },
    {
      title: "Hospital Resource Management System",
      year: "2023",
      description: [
        "Developed a C-based application implementing priority queues for emergency patient management",
        "Designed algorithms for optimal doctor-patient assignment based on specialization and urgency",
        "Implemented data structures for efficient patient record management and retrieval",
        "Integrated reporting capabilities to analyze hospital resource utilization patterns"
      ],
      tags: ["C", "Data Structures", "Algorithms", "Healthcare", "Resource Management"]
    },
    {
      title: "Algorithm Visualization Platform",
      year: "2023",
      description: [
        "Created an interactive visualization tool using PyGame to demonstrate pathfinding algorithms",
        "Implemented multiple algorithms (A*, Dijkstra, BFS, DFS) with comparative performance metrics",
        "Designed user interface allowing real-time parameter adjustment and obstacle placement",
        "Developed comprehensive documentation explaining algorithm applications in real-world scenarios"
      ],
      tags: ["Python", "PyGame", "Algorithms", "Visualization", "Pathfinding"]
    }
  ];

  return (
    <section id="projects" className="section-container bg-gray-50">
      <h2 className="section-title">Technical Projects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div key={index} className="card flex flex-col h-full">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-portfolio-primary">{project.title}</h3>
              <span className="bg-portfolio-primary text-white px-2 py-1 rounded text-sm">{project.year}</span>
            </div>
            
            <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4 flex-grow">
              {project.description.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            
            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-200">
              {project.tags.map((tag, i) => (
                <span 
                  key={i}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
