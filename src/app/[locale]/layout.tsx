import type { Metadata } from 'next';

import { routing } from '~i18n/routing';
import { cn } from '~lib/cn';
import { Header } from '~ui/header/header';
import { Loader } from '~ui/loader/loader';
import { ThemeProvider } from '~ui/theme-switcher/theme-provider';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { type ReactNode, Suspense } from 'react';

export const metadata: Metadata = {
  title: 'HUH App',
  keywords:
    '(.)anime, search (.)anime, Sousou no Frieren, Cowboy Bebop, (.)anime database',
  openGraph: {
    title: 'Anime Search - Find Your Favorite Anime',
    description:
      'Explore (.)anime titles, synopses, and genres with our fast and easy-to-use search tool.',
    type: 'website',
  },
  description:
    'Search for (.)anime like Sousou no Frieren, Cowboy Bebop, and more. Discover details, genres, and synopses.',
};

export default async function RootLayout({
  children,
  modal,
  params,
}: Readonly<{
  children: ReactNode;
  modal?: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider>
      <ThemeProvider>
        <html lang={locale}>
          <body>
            <div className="main-wrapper">
              <Header />
              <main className="flex w-full">
                <div className={cn('w-full')}>{children}</div>
                {modal && (
                  <Suspense fallback={<Loader />}>
                    <div className="overflow-hidden">{modal}</div>
                  </Suspense>
                )}
              </main>
            </div>
          </body>
        </html>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}