import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Atholton Electronics Club | Aqua Guardian water-quality buoy',
    template: '%s | Atholton Electronics Club',
  },
  description:
    'Atholton High School students building electronics projects. Our solar-powered Aqua Guardian buoy is deployed on Lake Elkhorn and sends water-quality readings online.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-cream min-h-screen flex flex-col font-sans text-gray-800">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
