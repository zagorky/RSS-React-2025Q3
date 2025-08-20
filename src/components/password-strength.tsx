import { passwordSchema } from '~types/form-types';
import { useMemo } from 'react';

type PasswordStrengthProps = {
  password: string;
};

export const PasswordStrength = ({ password }: PasswordStrengthProps) => {
  const strength = useMemo(() => {
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

  return (
    <div className="mt-1">
      <div className="h-2 w-full rounded bg-gray-200">
        <div className={`${strength.color} h-2 rounded`} />
      </div>
      <p className="mt-1 text-sm font-medium">{strength.label}</p>
    </div>
  );
};