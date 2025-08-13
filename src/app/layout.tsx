import type { Metadata } from 'next';

import { Header } from '~ui/header/header';

import './globals.css';
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

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="main-wrapper">
          <Header />
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}
