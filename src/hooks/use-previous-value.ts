import { useEffect, useRef } from 'react';

export function usePreviousValue<TValue>(value: TValue) {
  const previousValue = useRef<TValue | null>(null);

  useEffect(() => {
    previousValue.current = value;
  }, [value]);

  return previousValue;
}