import type { Metadata } from 'next';
import './globals.css';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: `${brand.name} — ${brand.tagline}`,
  description: brand.description,
  openGraph: {
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.description,
    url: brand.url,
    siteName: brand.name,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.description,
  },
  metadataBase: new URL(brand.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased bg-[#08090a] text-white selection:bg-violet-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
