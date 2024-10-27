import React from 'react';

function ProjectSelector({ projects, selectedProject, onSelectProject }) {
  return (
    <div className="project-selector">
      <label htmlFor="project-select">Select Project:</label>
      <select
        id="project-select"
        value={selectedProject ? selectedProject.id : ''}
        onChange={(e) => {
          const project = projects.find(p => p.id === e.target.value);
          onSelectProject(project);
        }}
      >
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.projectName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ProjectSelector;
