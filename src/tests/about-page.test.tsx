import { render, screen } from '@testing-library/react';
import AboutPage from '~pages/about/about-page';
import { MemoryRouter } from 'react-router';
import { expect } from 'vitest';

describe('About Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should render about page content', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );
    expect(screen.getByTestId('about-page-section')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'RS School React course' })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'My GitHub' })).toBeInTheDocument();
  });
});
