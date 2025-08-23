import type { ReactNode } from 'react';

import { withDataTestId } from '~utils/utilities';

type ItemImgProps = {
  url: string;
  alt: string;
  fallback?: ReactNode;
  testId?: string;
};

export const ItemImg = ({ url, alt, fallback, testId }: ItemImgProps) => (
  <>
    {url ? (
      <img className="aspect-square object-cover" {...withDataTestId(testId || '')} src={url} alt={alt} />
    ) : (
      fallback
    )}
  </>
);