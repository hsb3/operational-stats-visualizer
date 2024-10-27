import React from 'react';
import { render, screen } from '@testing-library/react';
import StageChart from '../process-inspector-react/src/components/StageChart';

test('renders StageChart component', () => {
  render(<StageChart />);
  const chartElement = screen.getByText(/stage chart/i);
  expect(chartElement).toBeInTheDocument();
});
