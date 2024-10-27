import React, { useState, useEffect } from 'react';
import { fetchProjects } from './services/api';
import ProjectSelector from './components/ProjectSelector';
import ProjectSummary from './components/ProjectSummary';
import StageNetwork from './components/StageNetwork';
import StageChart from './components/StageChart';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
        if (data.length > 0) {
          setSelectedProject(data[0]);
        }
      } catch (error) {
        console.error('Failed to load projects:', error);
      }
    };

    loadProjects();
  }, []);

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  return (
    <div className="App">
      <h1>Process Inspector</h1>
      <ProjectSelector 
        projects={projects} 
        selectedProject={selectedProject} 
        onSelectProject={handleProjectSelect} 
      />
      {selectedProject && (
        <>
          <ProjectSummary project={selectedProject} />
          <div className="visualizations">
            <StageNetwork stages={selectedProject.stages} />
            <StageChart stages={selectedProject.stages} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
