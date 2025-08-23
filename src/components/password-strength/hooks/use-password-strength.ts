import { passwordSchema } from '~types/form-types';
import { useMemo } from 'react';

export const usePasswordStrength = (password?: string) => {
  return useMemo(() => {
    if (!password) {
      return { label: 'Weak', color: 'bg-error' };
    }
    const result = passwordSchema.safeParse(password);
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
  }, [password]);
};