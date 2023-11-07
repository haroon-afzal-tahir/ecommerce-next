import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Providers } from './providers';
import { AcmeLogo } from '@/assets/AcmeLogo';
import { Icon } from 'next/dist/lib/metadata/types/metadata-types';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Acme',
  description: 'Acme - Your favorite online store',
  icons: [
    {
      rel: 'icon',
      url: '/acme.svg',
    },
    {
      rel: 'apple-touch-icon',
      url: '/acme.svg',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <main
            className={`${inter.className} flex flex-col gap-2 dark text-foreground bg-background`}
          >
            <Header />
            {children}
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
