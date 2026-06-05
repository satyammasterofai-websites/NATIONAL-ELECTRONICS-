import type {Metadata} from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });

export const metadata: Metadata = {
  title: 'National Electronics | Saharanpur\'s Premium Showroom',
  description: 'Premium Electronics • Genuine Products • Best Prices. Shop standard TVs, ACs, refrigerators and home appliances at Saharanpur\'s top showroom.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased text-white bg-[#0B1020]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
