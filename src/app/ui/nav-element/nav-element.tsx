'use client';
import { Link } from '~i18n/navigation';
import { cn } from '~lib/cn';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import React from 'react';

type NavElementProps = {
  path: string;
  translationKey: string;
};

function NavElement({ path, translationKey }: Readonly<NavElementProps>) {
  const pathname = usePathname();
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const normalizedPath = path === '/' ? '' : path;
  const isActive = `/${locale}${normalizedPath}` === pathname;

  return (
    <Link
      key={path}
      href={path}
      className={cn(
        'relative rounded-md px-4 py-2 font-medium transition-all duration-300 ease-in-out',
        'hover:text-text-primary-500',
        {
          'bg-primary-500 hover:bg-primary-600/70 text-text-on-primary after:bg-primary-600 font-semibold':
            isActive,
          'text-text-secondary hover:text-text-primary': !isActive,
        }
      )}
    >
      {t(translationKey)}
    </Link>
  );
}

export default NavElement;
