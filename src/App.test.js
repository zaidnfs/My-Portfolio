import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders the storybook landing page with the owner name', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { level: 1, name: /Mohammad Zaid Alam/i })
  ).toBeInTheDocument();
});

test('shows the featured current-work chapter', () => {
  render(<App />);
  expect(screen.getAllByText(/Salire Attitude/i).length).toBeGreaterThan(0);
  expect(screen.getByText(/The Bookmark Shelf/i)).toBeInTheDocument();
});

test('renders the bookmark shelf with every project bookmark', () => {
  render(<App />);
  ['STREAM', 'CodeSprint', 'Sentiment', 'HTTP/1.1'].forEach((bookmark) => {
    expect(screen.getByRole('tab', { name: new RegExp(bookmark, 'i') })).toBeInTheDocument();
  });
});

test('renders the journey timeline with every milestone pinned', () => {
  render(<App />);
  expect(screen.getByText(/Milestones Along the Way/i)).toBeInTheDocument();
  ['July 2021', 'May 2023', 'Jan 2026', 'Feb 2026'].forEach((date) => {
    expect(screen.getByText(date)).toBeInTheDocument();
  });
});

test('toggles night reading mode with the lamp button', () => {
  render(<App />);
  expect(document.documentElement.classList.contains('dark')).toBe(false);
  fireEvent.click(screen.getByRole('button', { name: /switch to night reading/i }));
  expect(document.documentElement.classList.contains('dark')).toBe(true);
  fireEvent.click(screen.getByRole('button', { name: /switch back to daylight/i }));
  expect(document.documentElement.classList.contains('dark')).toBe(false);
});

