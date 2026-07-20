import type { Metadata } from 'next';
import { Lora, DM_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { FriendsProgressProvider } from '@/components/FriendsProgressContext';
import { ThemeProvider } from '@/components/ThemeProvider';

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const ibmMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-ibm-mono',
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Learning Diary',
  description: 'Personal learning tracker — Java Roadmap, LeetCode Patterns, and JavaScript Mastery',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lora.variable} ${dmSans.variable} ${ibmMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Paint the correct background before hydration so dark users don't see a white flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('diary-theme')==='dark'){document.documentElement.style.background='#000';document.documentElement.style.colorScheme='dark';}}catch(e){}`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <FriendsProgressProvider>
            {children}
          </FriendsProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
