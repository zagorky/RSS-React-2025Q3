import type { DataItem } from '~types/types';

import { render, screen } from '@testing-library/react';
import { ResultItem } from '~pages/main/components/results-section/result-item';
import { expect } from 'vitest';

import { getSpecificQueryResponse } from '~/mocks/data';

const item = getSpecificQueryResponse().data[0] as DataItem;

describe('Result Item', () => {
  test('should displays item', () => {
    render(<ResultItem data={item} />);

    expect(screen.getByTestId('result-item')).toBeInTheDocument();
  });

  test('should have item name', () => {
    render(<ResultItem data={item} />);

    const title = screen.getByTestId('result-item-title');
    const itemTitle = item.title;

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(itemTitle);
  });

  test('should have item description', () => {
    render(<ResultItem data={item} />);

    const synopsis = screen.getByTestId('result-item-desc');
    const itemSynopsis = item.synopsis;

    expect(synopsis).toBeInTheDocument();
    expect(synopsis).toHaveTextContent(itemSynopsis);
  });

  test('should have image', () => {
    render(<ResultItem data={item} />);

    const img = screen.getByTestId('result-item-img');
    const itemImgUrl = item.images.webp.image_url;

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', itemImgUrl);
  });
});
