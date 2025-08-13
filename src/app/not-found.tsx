'use client';
import { withDataTestId } from '~lib/utilities';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <div
        {...withDataTestId('error-fallback')}
        className="m-auto flex h-[calc(100vh-200px)] max-w-xl flex-col items-center justify-center gap-10"
      >
        <div className="mb-6 flex justify-center">
          <div className="bg-error/10 text-error flex h-16 w-16 items-center justify-center rounded-full text-4xl font-bold">
            !
          </div>
        </div>
        <h1 className="text-error text-6xl">404 - Page Not Found</h1>

        <div className="mb-6 rounded-lg p-4">
          <p className="text-text-secondary text-lg">Something went wrong</p>
        </div>
        <div>
          <Link href={'/'} className="btn m-4">
            Go to Main
          </Link>
        </div>
      </div>
    </main>
  );
}