import type { ReactNode } from 'react';

import { cn } from '~lib/cn';
import { withDataTestId } from '~lib/utilities';

type InfoBadgeProps = {
  data: string | ReactNode;
  name?: string;
  testId: string;
  color: string;
};

export const InfoBadge = ({ name, data, testId, color }: InfoBadgeProps) => {
  return (
    <div>
      <div className="mb-1 font-semibold">{name}</div>
      <div
        {...withDataTestId(testId)}
        className={cn(
          'text-text-on-primary rounded-md px-2 py-1 capitalize',
          color
        )}
      >
        {data}
      </div>
    </div>
  );
};
