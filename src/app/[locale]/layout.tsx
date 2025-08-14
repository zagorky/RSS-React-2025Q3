import type { Metadata } from 'next';

import { routing } from '~i18n/routing';
import { Header } from '~ui/header/header';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { type ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'HUH App',
  keywords:
    'anime, search anime, Sousou no Frieren, Cowboy Bebop, anime database',
  openGraph: {
    title: 'Anime Search - Find Your Favorite Anime',
    description:
      'Explore anime titles, synopses, and genres with our fast and easy-to-use search tool.',
    type: 'website',
  },
  description:
    'Search for anime like Sousou no Frieren, Cowboy Bebop, and more. Discover details, genres, and synopses.',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <div className="main-wrapper">
            <Header />
            <main className="main">{children}</main>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
