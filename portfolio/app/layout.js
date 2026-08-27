import { Caveat, Inter } from 'next/font/google';
import './globals.css';

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-hand',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  title: 'Renz Anthony Buhay — Graphic Designer / Video Editor / Web Designer',
  description:
    'Portfolio of Renz Anthony Buhay — graphic design, video editing, and web design work.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${caveat.variable} ${inter.variable} font-sans bg-ink text-paper antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
