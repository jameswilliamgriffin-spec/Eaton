import type { Metadata } from 'next';
import { Caveat, Figtree } from 'next/font/google';
import './globals.css';

const figtree = Figtree({ subsets: ['latin'], variable: '--font-figtree' });
const accent = Caveat({ subsets: ['latin'], variable: '--font-accent' });

export const metadata: Metadata = {
  title: 'Eaton Mortgages | Friendly mortgage advice in Kings Heath',
  description: 'Clear, independent mortgage advice for people buying, moving and remortgaging around Kings Heath and Birmingham.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${figtree.variable} ${accent.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('eaton-theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light'}catch(e){}})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
