import { render, screen } from '@testing-library/react';
import { ResultItem } from '~pages/main/components/results-section/result-item';
import { MemoryRouter } from 'react-router';
import { expect } from 'vitest';

import { specificQueryResponse } from '~/tests/mocks/data';

const item = specificQueryResponse.data[0];

describe('Result Item', () => {
  test('should display item title', () => {
    render(
      <MemoryRouter>
        <ResultItem data={item} />
      </MemoryRouter>
    );

    const title = screen.getByTestId('result-item-title');
    const itemTitle = item.title;

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(itemTitle);
  });

  test('should have item description', () => {
    render(
      <MemoryRouter>
        <ResultItem data={item} />
      </MemoryRouter>
    );

    const synopsis = screen.getByTestId('result-item-desc');
    const itemSynopsis = item.synopsis;

    expect(synopsis).toBeInTheDocument();
    expect(synopsis).toHaveTextContent(itemSynopsis);
  });

  test('should display item image with correct URL', () => {
    render(
      <MemoryRouter>
        <ResultItem data={item} />
      </MemoryRouter>
    );

    const itemTitle = item.title;
    const itemImgUrl = item.images.webp.image_url;
    const img = screen.getByAltText(itemTitle);

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', itemImgUrl);
  });
});