import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/Header'; // Adjusted path
import Footer from '../components/Footer'; // Adjusted path

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Atholton Electronics Club',
  description: 'Engineering solutions for our community.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        --- THIS IS THE FIX ---
        I've added your 'bg-page-gradient' and 'min-h-screen' here
        to apply it to every page on the site.
      */}
      <body className={`${inter.className} bg-page-gradient min-h-screen`}>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}