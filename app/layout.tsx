import type { Metadata } from 'next';
import { Lora, DM_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { FriendsProgressProvider } from '@/components/FriendsProgressContext';

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
    <html lang="en" className={`${lora.variable} ${dmSans.variable} ${ibmMono.variable}`}>
      <body>
        <FriendsProgressProvider>
          {children}
        </FriendsProgressProvider>
      </body>
    </html>
  );
}
