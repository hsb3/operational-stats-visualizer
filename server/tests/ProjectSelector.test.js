import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectSelector from '../process-inspector-react/src/components/ProjectSelector';

test('renders ProjectSelector component', () => {
  const mockProjects = [
    { id: 1, projectName: 'Project One' },
    { id: 2, projectName: 'Project Two' },
  ];
  render(<ProjectSelector projects={mockProjects} selectedProject={1} onSelectProject={() => {}} />);
  const selectorElement = screen.getByRole('combobox');
  expect(selectorElement).toBeInTheDocument();
});
