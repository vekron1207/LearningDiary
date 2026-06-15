'use client';

import { useRouter } from 'next/navigation';
import ProfilePage from '@/components/ProfilePage';
import { useTheme } from '@/lib/useTheme';

export default function ProfileRoute() {
  const router = useRouter();
  const { isDark, toggleDark } = useTheme();

  return (
    <ProfilePage
      onBack={() => router.back()}
      isDark={isDark}
      onToggleDark={toggleDark}
    />
  );
}
