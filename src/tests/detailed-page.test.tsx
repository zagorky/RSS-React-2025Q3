import type { UseSuspenseQueryResult } from '@tanstack/react-query';
import type { DataItem } from '~types/types';

import { render, screen } from '@testing-library/react';
import { useDetailedPageQuery } from '~hooks/useDetailedPageQuery';
import { RouterProvider } from 'react-router';

import { specificQueryResponse } from '~/mocks/data';
import { createDetailedTestRouter } from '~/tests/test-utilties';

vi.mock('~hooks/useDetailedPageQuery');

describe('DetailedPage', () => {
  const mockData = specificQueryResponse.data[0] as DataItem;
  const id = specificQueryResponse.data[0].mal_id;

  beforeEach(() => {
    vi.mocked(useDetailedPageQuery).mockReturnValue({
      data: mockData,
    } as UseSuspenseQueryResult<DataItem, Error>);
  });

  test('renders all data correctly when query succeeds', async () => {
    render(<RouterProvider router={createDetailedTestRouter(mockData, id)} />);

    expect(
      await screen.findByRole('heading', { name: mockData.title })
    ).toBeInTheDocument();
    expect(screen.getByTestId('detailed-type')).toHaveTextContent(
      mockData.type
    );
    expect(screen.getByTestId('detailed-status')).toHaveTextContent(
      mockData.airing ? 'Ongoing' : 'Released'
    );

    expect(screen.getByTestId('detailed-score')).toHaveTextContent(
      mockData.score.toString()
    );

    const genreBadges = screen.getAllByTestId('detailed-genres');
    expect(genreBadges).toHaveLength(mockData.genres.length);
    mockData.genres.forEach((genre) => {
      expect(screen.getByText(genre.name)).toBeInTheDocument();
    });

    const image = screen.getByAltText(mockData.title);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockData.images.webp.image_url);

    expect(screen.getByTestId('detailed-synopsis')).toHaveTextContent(
      mockData.synopsis
    );

    expect(screen.getByRole('link', { name: /close/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /refresh/i })
    ).toBeInTheDocument();
  });
});
