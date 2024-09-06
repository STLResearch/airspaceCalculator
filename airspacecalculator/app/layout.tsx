import type { Metadata } from 'next';
import localFont from 'next/font/local';
import 'styles/globals.css';

const campton = localFont({
  variable: '--font-campton',
  src: [
    {
      path: './fonts/CamptonBold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/CamptonBook.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/CamptonMedium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/CamptonSemiBold.otf',
      weight: '600',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: 'SkyTrade - Air Rights Calculator',
  description:
    'SkyTrade lets you monetize your airspace, the legal right to use and control the space above buildings and land.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${campton.variable}`}>
      <body>{children}</body>
    </html>
  );
}
