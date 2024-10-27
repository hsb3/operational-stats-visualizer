import { render, screen } from '@testing-library/react';
import StageNetwork from '../process-inspector-react/src/components/StageNetwork';

test('renders StageNetwork component', () => {
  render(<StageNetwork />);
  const networkElement = screen.getByText(/stage network/i);
  expect(networkElement).toBeInTheDocument();
});
