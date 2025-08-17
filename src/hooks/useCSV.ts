import type { DataItem } from '~types/types';

import { useCallback, useEffect, useRef } from 'react';

export const useCSV = (data: DataItem[]) => {
  const objectUrlReference = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (objectUrlReference.current) {
        URL.revokeObjectURL(objectUrlReference.current);
        objectUrlReference.current = null;
      }
    };
  }, []);

  const downloadCSV = useCallback(async () => {
    try {
      if (objectUrlReference.current) {
        URL.revokeObjectURL(objectUrlReference.current);
        objectUrlReference.current = null;
      }

      const response = await fetch('/api/download-csv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        return new Error(`Server error: ${response.status}`);
      }
      console.log('res', response);
      const blob = await response.blob();
      objectUrlReference.current = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = objectUrlReference.current;
      link.download = `${data.length}-items.csv`;
      link.click();
    } catch (error) {
      console.error('Error while download CSV:', error);
    }
  }, [data]);

  return {
    downloadCSV,
  };
};
