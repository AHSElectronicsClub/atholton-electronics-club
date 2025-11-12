import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
      {/* ADD YOUR CLASSES HERE:
        - font-sans: Applies your default 'Inter' font (from your config)
        - bg-gray-light: Applies your custom '#F6F7F9' background color
        - text-navy: Applies your default text color (you can change this)
      */}
      <body className="min-h-screen flex flex-col font-sans bg-gray-light text-navy">
        
        <Header /> 
        
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
        
      </body>
    </html>
  );
}