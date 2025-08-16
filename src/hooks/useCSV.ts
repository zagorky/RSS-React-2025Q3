import type { DataItem } from '~types/types';

import { useCallback, useEffect, useRef } from 'react';

export const useCSV = (data: DataItem[]) => {
  const linkReference = useRef<HTMLAnchorElement>(null);
  const objectUrlReference = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (objectUrlReference.current) {
        URL.revokeObjectURL(objectUrlReference.current);
      }
    };
  }, []);

  const downloadCSV = useCallback(async () => {
    if (data.length === 0 || !linkReference.current) {
      return;
    }

    try {
      if (!objectUrlReference.current) {
        const response = await fetch('/api/download-csv', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          return new Error(`Server error: ${response.status}`);
        }

        const blob = await response.blob();
        objectUrlReference.current = URL.createObjectURL(blob);
      }

      linkReference.current.href = objectUrlReference.current;
      linkReference.current.download = `${data.length}-items.csv`;
      linkReference.current.click();
    } catch (error) {
      console.error('Error while download CSV:', error);
    }
  }, [data]);

  return {
    linkReference,
    downloadCSV,
  };
};