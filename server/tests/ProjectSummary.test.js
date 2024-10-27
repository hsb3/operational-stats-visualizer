import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectSummary from '../process-inspector-react/src/components/ProjectSummary';

test('renders ProjectSummary component', () => {
  const mockProject = {
    projectName: 'Test Project',
    summary: {
      totalTimeSpent: 100,
      timeElapsed: 50,
    },
  };
  render(<ProjectSummary project={mockProject} />);
  const summaryElement = screen.getByText(/project summary/i);
  expect(summaryElement).toBeInTheDocument();
});
