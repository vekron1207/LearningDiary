'use client';

/* Theme state is owned by ThemeProvider in the root layout so it persists
   across client-side navigation. This re-export keeps existing imports
   (`import { useTheme } from '@/lib/useTheme'`) working unchanged. */
export { useTheme } from '@/components/ThemeProvider';
