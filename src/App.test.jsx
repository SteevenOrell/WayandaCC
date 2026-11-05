import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );

describe('routes', () => {
  it('renders the home page with booking forms', () => {
    renderAt('/');
    expect(screen.getAllByRole('heading', { level: 1 }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('button', { name: /submit|send|request/i }).length).toBeGreaterThan(0);
  });

  it('renders the about page', () => {
    renderAt('/about-us');
    expect(screen.getAllByText(/founder/i).length).toBeGreaterThan(0);
  });

  it('renders the 404 page for unknown routes', () => {
    renderAt('/does-not-exist');
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
});
