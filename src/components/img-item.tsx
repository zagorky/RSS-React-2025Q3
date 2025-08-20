import type { ReactNode } from 'react';

import { withDataTestId } from '~utils/utilities';

type ItemImgProps = {
  url: string;
  alt: string;
  fallback?: ReactNode;
};

export const ItemImg = ({ url, alt, fallback }: ItemImgProps) => {
  return (
    <>
      {url ? (
        <img className="aspect-square object-cover" {...withDataTestId('result-item-img')} src={url} alt={alt} />
      ) : (
        fallback
      )}
    </>
  );
};