import type { DataItem } from '~types/types';

import { generateCSV } from '~lib/csv-helpers';
import { useCallback, useEffect, useRef } from 'react';

export const useCSV = (data: DataItem[]) => {
  const linkReference = useRef<HTMLAnchorElement>(null);
  const objectUrlReference = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (objectUrlReference.current) {
        URL.revokeObjectURL(objectUrlReference.current);
        objectUrlReference.current = null;
      }
    };
  }, []);

  const downloadCSV = useCallback(() => {
    if (!linkReference.current) {
      return;
    }

    const csvData = generateCSV(data);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

    if (objectUrlReference.current) {
      URL.revokeObjectURL(objectUrlReference.current);
    }

    const url = URL.createObjectURL(blob);
    objectUrlReference.current = url;

    linkReference.current.href = url;
    linkReference.current.download = `${data.length}-items.csv`;
    linkReference.current.click();
  }, [data]);

  return {
    linkReference,
    downloadCSV,
  };
};
