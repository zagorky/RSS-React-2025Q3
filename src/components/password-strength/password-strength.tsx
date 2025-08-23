import { usePasswordStrength } from '~components/password-strength/hooks/use-password-strength';
import { type RefObject, useEffect, useImperativeHandle, useState } from 'react';

export type PasswordStrengthProps = {
  password?: string;
  api?: RefObject<{ setPassword: (password: string) => void } | null>;
};

export const PasswordStrength = ({ api, password }: PasswordStrengthProps) => {
  const [localPassword, setLocalPassword] = useState(password);

  useImperativeHandle(
    api,
    () => ({
      setPassword: (value: string) => {
        if (api && value !== localPassword) {
          setLocalPassword(value);
        }
      },
    }),
    [api, localPassword]
  );

  useEffect(() => {
    setLocalPassword(password);
  }, [password]);

  const { label, color } = usePasswordStrength(localPassword);

  return (
    <div className="mt-1">
      <div className="h-2 w-full rounded bg-gray-200">
        <div className={`${color} h-2 rounded`} />
      </div>
      <p className="mt-1 text-sm font-medium">{label}</p>
    </div>
  );
};