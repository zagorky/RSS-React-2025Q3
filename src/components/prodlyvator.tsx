import { type ReactNode, useEffect, useState, useRef, memo } from 'react';

type ProdlyatorProps = {
  value: string;
  children: (value: string, isProdlyator: boolean) => ReactNode;
};

export const Prodlyvator = memo(({ value, children }: ProdlyatorProps) => {
  const [isProdlyvator, setIsProdlyvator] = useState(false);
  const previousValueReference = useRef<string>(undefined);
  const timeoutReference = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (previousValueReference.current !== undefined && previousValueReference.current !== value) {
      if (timeoutReference.current) {
        clearTimeout(timeoutReference.current);
      }
      setIsProdlyvator(true);

      timeoutReference.current = setTimeout(() => {
        setIsProdlyvator(false);
        timeoutReference.current = undefined;
      }, 1000);
    }

    previousValueReference.current = value;
  }, [value]);

  return children(value, isProdlyvator);
});

Prodlyvator.displayName = 'Prodlyvator';