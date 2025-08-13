'use client';
import { cn } from '~lib/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type NavElementProps = {
  path: string;
  title: string;
};

function NavElement({ path, title }: Readonly<NavElementProps>) {
  const pathname = usePathname();

  return (
    <Link
      key={path}
      href={path}
      className={cn(
        'relative rounded-md px-4 py-2 font-medium transition-all duration-300 ease-in-out',
        'hover:text-text-primary-500',
        {
          'bg-primary-500 hover:bg-primary-600/70 text-text-on-primary after:bg-primary-600 font-semibold':
            pathname === path,
          'text-text-secondary hover:text-text-primary': pathname !== path,
        }
      )}
    >
      {title}
    </Link>
  );
}

export default NavElement;
