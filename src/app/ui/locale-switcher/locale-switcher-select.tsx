'use client';

import { usePathname, useRouter } from '~i18n/navigation';
import { cn } from '~lib/cn';
import { useSearchParams } from 'next/navigation';
import { type ChangeEvent, type ReactNode, useTransition } from 'react';

type LocaleSwitcherSelectProps = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Readonly<LocaleSwitcherSelectProps>) {
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;

    const currentQuery = Object.fromEntries(searchParams.entries());

    startTransition(() => {
      replace({ pathname, query: currentQuery }, { locale: nextLocale });
    });
  }

  return (
    <label
      className={cn(
        'btn',
        'relative text-gray-400',
        isPending && 'transition-opacity [&:disabled]:opacity-30'
      )}
    >
      <p className="sr-only">{label}</p>
      <select
        className="inline-flex appearance-none bg-transparent"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
    </label>
  );
}