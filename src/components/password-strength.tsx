import type { RefObject } from 'react';

import { passwordSchema } from '~types/form-types';
import { useEffect, useMemo, useState } from 'react';

export type PasswordStrengthProps = {
  password?: string;
  api?: RefObject<{ setPassword: (password: string) => void } | null>;
};

export const PasswordStrength = ({ api, password }: PasswordStrengthProps) => {
  const [localPassword, setLocalPassword] = useState(password);

  //TODO useImperativeRef попробовать переписать
  useEffect(() => {
    if (api) {
      api.current = {
        setPassword: (value: string) => {
          if (value !== localPassword) {
            setLocalPassword(value);
          }
        },
      };
    }
  }, [api, localPassword]);

  useEffect(() => {
    setLocalPassword(password);
  }, [password]);

  const strength = useMemo(() => {
    if (!localPassword) {
      return { label: 'Weak', color: 'bg-error' };
    }
    const result = passwordSchema.safeParse(localPassword);
    const totalChecks = 6;
    const passedChecks = result.success ? totalChecks : totalChecks - result.error.issues.length;

    if (passedChecks <= 4) {
      return { label: 'Weak', color: 'bg-error' };
    }
    if (passedChecks <= 5) {
      return { label: 'Medium', color: 'bg-warning' };
    }

    if (passedChecks === 6) {
      return { label: 'Strong', color: 'bg-secondary-500' };
    }

    return { label: 'Weak', color: 'bg-error' };
  }, [localPassword]);

  return (
    <div className="mt-1">
      <div className="h-2 w-full rounded bg-gray-200">
        <div className={`${strength.color} h-2 rounded`} />
      </div>
      <p className="mt-1 text-sm font-medium">{strength.label}</p>
    </div>
  );
};