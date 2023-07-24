import { fireEvent, render, screen } from '@testing-library/react';
import RefreshButton from '../RefreshButton';

test('renders button', () => {
  const onClick = jest.fn();

  render(<RefreshButton onClick={onClick} />);

  const button = screen.getByRole('button');
  fireEvent.click(button);

  expect(onClick).toHaveBeenCalledTimes(1);
});
