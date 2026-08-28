import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the storybook landing page with the owner name', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { level: 1, name: /Mohammad Zaid Alam/i })
  ).toBeInTheDocument();
});

test('shows the featured current-work chapter', () => {
  render(<App />);
  expect(screen.getByText(/Salire Attitude/i)).toBeInTheDocument();
  expect(screen.getByText(/The Bookmark Shelf/i)).toBeInTheDocument();
});

test('renders the bookmark shelf with every project bookmark', () => {
  render(<App />);
  ['STREAM', 'CodeSprint', 'Sentiment', 'HTTP/1.1'].forEach((bookmark) => {
    expect(screen.getByRole('tab', { name: new RegExp(bookmark, 'i') })).toBeInTheDocument();
  });
});
