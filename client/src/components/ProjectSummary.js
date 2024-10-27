import React from 'react';

function ProjectSummary({ project }) {
  return (
    <div className="project-summary">
      <h2>{project.projectName} Summary</h2>
      <div className="summary-grid">
        <div className="summary-item">
          <h3>Total Time Spent</h3>
          <p>{project.summary.totalTimeSpent} hours</p>
        </div>
        <div className="summary-item">
          <h3>Time Elapsed</h3>
          <p>{project.summary.timeElapsed} hours</p>
        </div>
        <div className="summary-item">
          <h3>Money Spent</h3>
          <p>${project.summary.moneySpent}</p>
        </div>
        <div className="summary-item">
          <h3>Rejections</h3>
          <p>{project.summary.rejections}</p>
        </div>
      </div>
    </div>
  );
}

export default ProjectSummary;
